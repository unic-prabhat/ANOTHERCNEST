/**
 * Theme: Metrica - Responsive Bootstrap 4 Admin Dashboard
 * Author: Mannatthemes
 * Dragula Js
 */
var _token = $('meta[name="csrf-token"]').attr('content');
dragula([
    document.getElementById("project1"),
    document.getElementById("project2"),
    document.getElementById("project3"),
    document.getElementById("project4"),
	document.getElementById("project5")
]).on('drag', function (el) {

				console.log(el);
            var did = el.getAttribute('data-id');
            parentDiv = el.parentNode;

            var parentId = parentDiv.getAttribute('data-id');

				// $.ajax({

				// 	url: '/crmnest/updateOld',
				// 	data: {did: did, cid:parentId},
				// 	type: 'post',
				// 	success: function(data)
				// 	{
				// 			console.log(data);
				// 	}
				// })
            el.className = el.className.replace('ex-moved', '');

        }).on('drop', function (el, target, source, sibling) {
                var source_idd = source.getAttribute('id');
				var all = target.getAttribute('id');
                // console.log(target);

            var changeto = target.getAttribute('status');
            var status = el.getAttribute('status-id');
            var rowid = el.getAttribute('row-id');
			$('#'+all).removeClass('dropify-wrapper');
            $.ajax({

                url: '/crmnest/task/sync',
                data: {changeTo: changeto, status: status,rowid:rowid,_token:_token},
                type: 'post',
                success:function(data){

                    var stst = data.status_id;

                    el.setAttribute('status-id',stst);
                }

            });
			moreUpdate(all);
			udpatePrice(source_idd);
			updateLead(source_idd);

			updateTargetLead(target);

        });


			function updateTargetLead(target)
			{
				var at = [];
				var idd = target.getAttribute('id');
				$('#'+idd+' .chh').each(function(index,value){

					at.push(value);

				})
				var ss = $('#'+idd).parent().find('.head');
						$(ss).find('#leadcount').html(at.length+' Leads');
			}
		function udpatePrice(ell)
		{
			console.log(ell);
			var art = [];
			var price = 0;
			$('#'+ell+' .ch .price').each(function(index, value){

					art.push(value);
			})
			console.log(art);
				if(art.length !='')
				{
				$('#'+ell+' .price').each(function(index, value){

						price +=parseFloat(value.textContent);
						//console.log(price);
						var ss = $('#'+ell).parent().find('.head');
						$(ss).find('#price').html('£' +price);

				})
				}
			else
			{
				var ss = $('#'+ell).parent().find('.head');
						$(ss).find('#price').html('£ 0');

			}


		}

		function updateLead(ell)
		{
				console.log(ell);
			var art = [];
			var price = 0;
			$('#'+ell+' .chh').each(function(index, value){

					art.push(value);
			})
			console.log(art.length);
				if(art.length !='')
				{
				$('#'+ell+' .chh').each(function(index, value){

						price +=parseFloat(value.textContent);
						//console.log(price);
						var ss = $('#'+ell).parent().find('.head');
						$(ss).find('#leadcount').html(art.length+' Leads');

				})
				}
			else
			{
				var ss = $('#'+ell).parent().find('.head');
						$(ss).find('#leadcount').html('0 Leads');
						$('#'+ell).addClass('dropify-wrapper');

			}
		}

		function moreUpdate(all)
		{
			//console.log(all);
			var price = 0;

				$('#'+all+' .price').each(function(index, value){

						price +=parseFloat(value.textContent);
						//console.log(price);
						var ss = $('#'+all).parent().find('.head');
						$(ss).find('#price').html('£' +price);

				})


		}

		$(document).ready(function(){
			$('.destroy').on('click',function(){
				var ele = $(this).parent().parent().attr('id');
				var lead_id = $(this).attr('lead-id'),
				task_id = $(this).attr('data-id');
			swal({
        title: 'Are you sure?',
        text: 'This record will be permanantly deleted!',
        icon: "warning",
    buttons: {
        confirm : {text:'Ok',className:'sweet-warning'},
        cancel : 'Cancel'
    },
    }).then(function(value) {
        if (value) {
       $.ajax({

					url: '/crmnest/taskDestroy',
					data: {lead_id: lead_id, task_id: task_id, _token: _token},
					type: 'post',
					success: function(data){

						console.log(data);
					}

				});
       			$('#'+ele).fadeOut();
        }

    });

			})
		})
			//console.log(deal_id);
