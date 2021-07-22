/**
* Theme: Metrica - Responsive Bootstrap 4 Admin Dashboard
* Author: Mannatthemes
* Component: Full-Calendar
*/
$(document).ready(function(){

	$('#calendar').fullCalendar({
		eventAfterRender: function(event, element, view) {
			 $(element).css('width','100px');
             $(element).css('height','200px');

		 },
		defaultView: 'agendaWeek',
		timeFormat: 'H:mm a',
		editable: true,
		height: "auto",
		header: {

			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		events: '/crmnest/loadEvents',
		eventRender: function (event,element)
		{
         
  //$el.addClass(eventObj.ClassName);
    console.log('EVENT NAME'+event.leadownername);
	// var fullName = event.name.split(' ');
	// var initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
 //    var originalname = initials.toUpperCase();
	var type = event.type;
	var app = '<div class="main-listing-cal" style="background-color:'+event.leadownercolor+' !important;color:#fff;">'+
	           '<span><i class="fa fa-user" style="color:#fff;"></i>&nbsp;'+event.leadname+'</span>'+'<br>'+
	           '<span><i class="fa fa-map-marker" aria-hidden="true" style="color:#fff;"></i>&nbsp;'+event.address+'</span>'+'<br>'+
						 '<span><i class="fa fa-users" aria-hidden="true" style="color:#fff;"></i>&nbsp;'+event.leadownername+'</span>'+'<br>'
	           +'</div>';
    element.append(app);

		element.attr( 'id', event.id );
		if(event.status == 'completed'){
			element.addClass('complete');
		}else{
      console.log("Not Available")
			element.addClass('not');
		 }

		},
		editable: true,
		droppable: true, // this allows things to be dropped onto the calendar
	    drop: function(date, jsEvent, ui, resourceId) {
	      //alert("drop: " + date.format());
	    },
        eventDrop: function(event, delta, revertFunc, jsEvent, ui, view) {

          //alert("eventDrop: " + event.start.format());

           var dt1 = event.start.format().replace('T', ' ').replace('Z', '');

              $.ajax({

              url: '/crmnest/getupdatedevent',
              method:'post',
              data:{
                  
                  _token: CSRF_TOKEN,
              	  id:event.id,
              	  updateddate:dt1

              },
              success:function(data){
                 
                 if(data == 'success'){
                  swal("Reschedule!", "Rescheduled Successfully!", "success")
                  location.reload();
                 }

              }
             })


      }

	});

	$(document).delegate('.fc-day-grid-event, .fc-time-grid-event','click', function(e){

		var modal = '';
		e.preventDefault();
		$('#onemodal').remove();
		var id = $(this).attr('id');

		$.ajax({

			url: '/crmnest/getleadDetails/'+id,
			success: function(data){
      console.log('MODAL INFORMATION',data)
			modal += '<div class="modal fade" id="onemodal"><div class="modal-dialog">';
			modal +='<div class="modal-content"><div class="modal-content" ><div class="modal-header">';
							modal +='<h3>'+data.new_title+'</h3>';
              modal += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>';
										modal += '</div>';
										modal +='<div class="modal-body">';
										modal +='<div class="container">';
												modal +='<div class="row"><div class="col-lg-4"><div class="met-profile_user-detail">';
                                                        modal +='<h5 class="met-user-name">'+ data.firstname+' '+data.surname+'</h5>';
                                                        modal +='<p class="mb-0 met-user-name-post">'+data.status+'</p>';
                                                modal +='</div></div><div class="col-lg-8 ml-auto">';
                                                modal += '<ul class="list-unstyled personal-detail">';
                                                    modal +='<li class=""><i class="dripicons-phone mr-2 text-info font-18"></i> <b> phone </b> : +'+data.mobilenumber+'</li>';
                                                    modal += '<li class="mt-2"><i class="dripicons-mail text-info font-18 mt-2 mr-2"></i> <b> Email </b> :'+data.email+'</li>';
                                                   
                                                modal +='</ul></div></div></div>';
											modal +='<div class="container"><div class="row"><div class="col-lg-12"> <b>Location: </b>'+data.address+','+data.town+','+data.postcode+'</div></div><div class="row"><div class="col-lg-12"> <b>Details: </b>'+data.new_note+'</div></div><div class="row"><div class="col-lg-12"> <b>Date & Time: </b>'+data.new_time+'</div></div></div>';
                                           modal +='<div class="d-flex justify-content-center mb-2 mt-2">';
											if(data.userrole == 2){
													modal +='<a href="/crmnest/saleslead/'+data.new_leadids_id+'" class="btn btn-sm btn-gradient-secondary ml-1">Go to Lead Page</a>&nbsp;&nbsp;&nbsp;&nbsp;';

											}else{
												modal +='<a href="/crmnest/lead/'+data.new_leadids_id+'" class="btn btn-sm btn-gradient-secondary ml-1">Go to Lead Page</a>&nbsp;&nbsp;&nbsp;&nbsp;';
											}

											if(data.scheduletasks != 'completed')
											{
												$.each(data.scheduletasks, function(index, value){
													if(id == value.id)
													{
														if(value.status != 'completed')
														{
															modal +='<a href="javascript::void(0)" class="btn btn-sm btn-gradient-primary" id="modalContact" datat-id="'+value.id+'">Mark as Complete</a>';
														}
													}
												})

											}
											modal +='</div></div></div></div></div></div>';

			$('body').append(modal);
			$('#onemodal').modal('show');
			}

		})
	});

	$(document).on('click','#modalContact',function(e){
		e.preventDefault();
		var idd = $(this).attr('datat-id');
		$.ajax({

			url: '/crmnest/completed/'+idd,
			success: function(data){

				swal("Done!", "Meeting status change to completed!", "success")

			}
		});
		$('#onemodal').modal('hide');
	});
})
