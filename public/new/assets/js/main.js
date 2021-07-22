$(document).ready(function(){



	var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');

$('#smartwizard').smartWizard({



   selected: 0,

              theme: 'arrows',

              enableURLhash: false,

              transition: {

                  animation: 'slide-horizontal', // Effect on navigation, none/fade/slide-horizontal/slide-vertical/slide-swing

              },

              toolbarSettings: {

                  toolbarPosition: 'bottom', // both bottom

                  toolbarButtonPosition: 'center', // both bottom

                  toolbarExtraButtons: [

                  $('<button type="submit" id="hsubmit" disabled></button>').text('Submit')

                            .addClass('btn btn-info')





                            ]

              },







});

$("#smartwizard").on("leaveStep", function(e, anchorObject, stepNumber, stepDirection) {



     if(stepNumber == 2)

     {

         $('#hsubmit').removeAttr('disabled');



         }

         else

         {

            $('#hsubmit').attr('disabled');

         }

});



$(document).on('keyup','#postcode',function(){

		var val = $(this).val();



			if(val.trim() !='')

			{

		$.ajax({



			url: '/crmnest/getCityState/'+val.trim(),

			success: function(data)

			{

					$.each(data, function(index, value)

					{

						console.log(value);

						if(value)

						{

						$('#address').val(value.city);

						$('#town').val(value.state);

						}

						else

						{

							$('#address').val('');

						$('#town').val('');

						}

					})

			}

		});

			}

			else

			{

					$('#address').val('');

						$('#town').val('');

			}



	})



	$(document).on('click','.noti_close', function(e){

			e.preventDefault();

		var idd = $(this).attr('data-id');

		$.ajax({



			url: '/crmnest/callupdatestatus',

			type: 'post',

			data: {idd: idd,_token:CSRF_TOKEN},

			success: function(data)

			{

				console.log(data);



			}

		});

		$(this).parent().fadeOut();

	})

	$(document).on('click','.notification-list a', function(e){

			e.preventDefault();

		$('.sub-menu-top').toggleClass('show-noti_fi');

	})

	$(document).on('click',function(e){

	if(!$(e.target).is('.sub-menu-top, .notification-list, .nav-link, .noti-icon, .noti_close, .dropdown-item-text, svg, line'))

			{

				$('.sub-menu-top').removeClass('show-noti_fi');

			}

	})

	$(document).on('keydown','#tab3', function(e){



		// if(e.which == 9)

		// {

			// $('button.sw-btn-next').focus();

		// }

	})



	$(document).on('click','.setting', function(){



			$('.page-content-tab').addClass('active-sidebar');

			$('.report').removeClass('side-show');

			$('.sub-menu').addClass('side-show');

	})

	$(document).on('click','.reporting', function(){

			$('.sub-menu').removeClass('side-show');

			$('.page-content-tab').addClass('active-sidebar');

			$('.report').addClass('side-show');

	})

})



$(document).on('focusout','#amendone',function(){

	var total = '';

	var val = $(this).val();

	var total = $('#guideone').val();

	total2 = parseInt(val) + parseInt(total);

	$('#answerone').val(total2);

})

$(document).on('focusout','#amendtwo',function(){

	var total = '';

	var val = $(this).val();

	var total = $('#guidetwo').val();

	total2 = parseInt(val) + parseInt(total);

	$('#answertwo').val(total2);

})

$(document).on('focusout','#amendthree',function(){

	var total = '';

	var val = $(this).val();

	var total = $('#guidethree').val();

	total2 = parseInt(val) + parseInt(total);

	$('#answerthree').val(total2);

})



$(document).on('click','.close-sub', function(){

	$('.page-content-tab').removeClass('active-sidebar');

			$('.sub-menu').removeClass('side-show');

			$('.report').removeClass('side-show');



})

var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');

$(document).on('click','.dropdown-menu a', function(){



	var htm = $(this).text();

	var leadid = $(this).attr('lead-id');

	$('#lead_status_show').html(htm);

	$.ajax({



		url: '/crmnest/updateLeadind',

		type: 'post',

		data: {leadid: leadid,_token: CSRF_TOKEN, htm: htm},

		success: function(data)

		{

				console.log(data);

		}

	});

})



$(document).on('click','#filterlead', function(){

	let user_id = sessionStorage.getItem('userid');

	var table = '<div>';

	  table +='<table class="table" id="datatable"><thead class="thead-light"><tr>';

               table +='<th>Name</th><th>Email</th><th>Contact</th><th>Address</th><th>Lead Source</th><th>Lead Owner</th><th>Status</th></tr></thead><tbody>';

	var sub_li = [];

	var formData = $('#filterForm').serializeArray();

		for(var i in formData)

		{

			if(formData[i].name =='_token')

			{

				continue;



			}

			else if(formData[i].value !='')

			{

				sub_li.push(`<li class="itemsFilter badge badge-primary" data='${formData[i].name}'>${formData[i].name}&nbsp;:&nbsp;${formData[i].value}<span class="delFil">&nbsp;<i class="fa fa-times"></i></span></li>&nbsp;`)

			}

		}

		$('#addfilteroption').html(sub_li);

	$.ajax({

		url: '/crmnest/leadfilter',

		data: formData,

		type:'post',

		dataType: 'json',

		beforeSend: function()

		{

			$('.loader').addClass('act');

		},

		success: function(data)


		{

			

			if(data !='')

			{

			$.each(data, function(index, value){



								table += '<tr>';

								 table +='<td><a href="https://www.kafesta.com/crmnest/lead/'+value.id+'">'+value.firstname+'</a></td>';

                                 table += '<td><a href="https://www.kafesta.com/crmnest/lead/'+value.id+'">'+value.email+'</a></td>';

                                 table += '<td><a href="https://www.kafesta.com/crmnest/lead/'+value.id+'">'+value.mobilenumber+'</a></td>';

                                 table += '<td><a href="https://www.kafesta.com/crmnest/lead/'+value.id+'">'+value.address+','+value.town+','+value.country+'</a></td>';

                                 table += '<td><a href="https://www.kafesta.com/crmnest/lead/'+value.id+'">'+value.leadsource+'</a></td>';

								 table += '<td><a href="https://www.kafesta.com/crmnest/lead/'+value.id+'">'+value.user.name+'</a></td>';

                                    table += '<td> <a href="">';

										if(value.status == 'New Lead')

								 {

								 table +='<span class="badge badge-md badge-soft-purple">'+value.status+'</span></a>';

								 }



								 else if(value.status == 'Hot Lead')

								 {

									 table +='<span class="badge badge-md badge-soft-danger">'+value.status+'</span></a>';

								 }

								 else if(value.status == 'Cold Lead')

								 {



									 table +='<span class="badge badge-md badge-soft-success">'+value.status+'</span></a>';

								 }

								 else

								 {

									 table +='<span class="badge badge-md badge-soft-purple">'+value.status+'</span></a>';

								 }



								table +='</a></td>';

							
							table += '<div class="modal fade showCall" id="callingm">';
                           table += '<div class="modal-dialog">';
                               table += '<div class="modal-content">';
                                  table += '<div class="modal-body">';
                                     table += '<div class="form-group">';
                                        table += '<div class="form-row">';

                                           table += '<div class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true" data-toggle="toast" style="width:100%;">';
                                              table += '<div class="toast-header">';
                                                 table += '<span id="popup-close-m">&times;</span>';
                                                 table += '<i class="mdi mdi-circle-slice-8 font-18 mr-1 text-warning"></i>';
                                                 table += '<strong class="mr-auto"><label id="runtime" class="mt-3">00:00:00</label></strong>';
                                                 table += '<small class="text-muted"></small>';
                                              table += '</div>';
                                              table += '<div class="toast-body">';
                                                 table += '<form  method="post" id="frontCallfrm">';
                                                    table += '<input type="hidden" name="_token" value="jUcVmOjPm7L4O80vksyEgNVZKp5e6ApX6fdKCuF2">';
                                                    table += '<input type="hidden" name="lead_id" value="'+value.id+'" id="lead_id">';
                                                    table += '<input type="hidden" name="user_id" value="'+user_id+'" id="user_id">';
                                                    table += '<textarea class="form-control" rows="3" id="call_note_text" name="call" placeholder="Your Notes.." disabled></textarea>';

                                                    table += '<div class="timer">';

                                                    table += '<button class="categories btn btn-danger btn-square waves-effect waves-light mt-2 btn-sm create-note-button float-right mb-2" type="button" id="stopcallui">Stop Call</button>';

                                                   table += '</div>';
                                                    table += '<div class="float-left all_tags">';
                                                       table += '<span>Not receive</span> <span>Call later</span>';
                                                    table += '</div>';
                                                    table += '<button class="categories btn btn-blue btn-square waves-effect waves-light mt-2 btn-sm create-note-button float-right mb-2" type="submit" id="startcall">Start Call</button>';

                                                 table += '</form>';
                                              table += '</div>';
                                           table += '</div>';
                                        table += '</div>';
                                     table += '</div>';
                                  table += '</div>';
                               table += '</div>';
                            table += '</div>';
                         table += '</div></tr>';

						})

			}

			else

			{

				table +='<tr><td>No record Found</td></tr>';

			}

						table += '</tbody></table></div>';



			$('#getTable').html(table);

			$('#filtersId').modal('hide');

		},

		complete: function()

		{

			$('.loader').removeClass('act');

		}

	});

})


  
	function showCall(idd)

	{



		$("#showCall"+idd).modal('show');

	}

$(document).on('click','.status_complete_ajax', function(){



	var id = $(this).attr('data-id');

	$.ajax({

		url: '/crmnest/cmodeModel',

		type: 'post',

		data: {id:id},

		success: function(data)

		{

				console.log(data);

		}



	});

})

$(document).on('click','.close-mph', function()

{

	$(this).parent().fadeOut();

})



$(document).on('click','.filtered', function()

{

	$('.filtersByStatus').fadeToggle();

})

var ary = [];

function fun(key, val)

{



var obj = {};



obj[key] = val;



ary.push(obj);



	return ary;

}



$(document).on('click','.delFil',function(){



	var table = '<div>';

	  table +='<table class="table" id="datatable"><thead class="thead-light"><tr>';

               table +='<th>Name</th><th>Email</th><th>Contact</th><th>Address</th><th>Lead Source</th><th>Lead Owner</th><th>Status</th><th>Call</th></tr></thead><tbody>';

	var parentp = $(this).parent().attr('data');

	console.log(parentp);

	$('#filterForm').find('input[name="'+parentp+'"]').val('');

	$('#filterForm').find('select[name="'+parentp+'"]').val('');

	$(this).parent().fadeOut().remove();

	$.ajax({



					url: '/crmnest/leadfilter',

					type:'post',

					data: $('#filterForm').serializeArray(),

					dataType: 'json',

					beforeSend: function()

					{

						$('.loader').addClass('act');

					},

					success: function(data)

					{



					if(data !='')

					{

						$.each(data, function(index, value)

						{



								table += '<tr>';

								 table +='<td><a href="https://rugs.a2hosted.com/crmnest/lead/'+value.id+'">'+value.firstname+'</a></td>';

                                 table += '<td><a href="https://rugs.a2hosted.com/crmnest/lead/'+value.id+'">'+value.email+'</a></td>';

                                 table += '<td><a href="https://rugs.a2hosted.com/crmnest/lead/'+value.id+'">'+value.mobilenumber+'</a></td>';

                                 table += '<td><a href="https://rugs.a2hosted.com/crmnest/lead/'+value.id+'">'+value.address+','+value.town+','+value.country+'</a></td>';

                                 table += '<td><a href="https://rugs.a2hosted.com/crmnest/lead/'+value.id+'">'+value.leadsource+'</a></td>';

								 table += '<td><a href="https://rugs.a2hosted.com/crmnest/lead/'+value.id+'">'+value.user.name+'</a></td>';

                                 table += '<td> <a href="https://rugs.a2hosted.com/crmnest/lead/'+value.id+'">';

								if(value.status == 'New Lead')

								 {

								 table +='<span class="badge badge-md badge-soft-purple">'+value.status+'</span></a>';

								 }



								 else if(value.status == 'Hot Lead')

								 {

									 table +='<span class="badge badge-md badge-soft-danger">'+value.status+'</span></a>';

								 }

								 else if(value.status == 'Cold Lead')

								 {



									 table +='<span class="badge badge-md badge-soft-success">'+value.status+'</span></a>';

								 }

								 else

								 {

									 table +='<span class="badge badge-md badge-soft-purple">'+value.status+'</span></a>';

								 }



								table +='</a></td>';

								table +='<td><span class="todo_call"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-phone-call"><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></span></td></tr>';



						})

					}

					else

					{

						table +='<tr><td>No record Found</td></tr>';

					}

						table += '</tbody></table></div>';

						$('#getTable').html(table);

						$('#filtersId').modal('hide');



					},

					complete: function()

					{

						$('.loader').removeClass('act');

					}



				});

	// for(var i in parentp)

	// {

		// if(parentp[i].getAttribute('id'))

		// {

			// var mai = parentp[i].getAttribute('id');

			// $('#'+mai+' li').each(function(index, value){



				// var key = value.getAttribute('data');

				// var val = value.textContent;



				// $.ajax({



					// url: '/crmnest/leadfilter',

					// type:'post',

					// data: new fun(key, val),

					// dataType: 'json',

					// beforeSend: function()

					// {

						// $('.loader').addClass('act');

					// },

					// success: function(data)

					// {

						// var append = JSON.stringify(data);

						// $('#getTable').html(append);

						// $('#filtersId').modal('hide');

					// },

					// complete: function()

					// {

						// $('.loader').removeClass('act');

					// }



				// });

			// })

			// break;

		// }



	// }



})





window.onload = function(){



	var path = window.location.pathname;

	var ne = path.split('/');

	$.each(ne, function(index, value){



		//$('.'+ne).addClass('active');

		console.log(value);



	})



}



