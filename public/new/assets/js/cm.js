 $(document).ready(function(){


var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');


var running = 0
var time = 0;
var hour = 0;
var min = 0;
var sec = 0;
var millisec = 0;

function start(){
    started = window.setInterval(clockRunning, 1000);
}

function stop(){
    window.clearInterval(started);
}

function clockRunning(){
    time++;
    sec++;
    if (sec == 60){
        min += 1;
        sec = 0;
    if (min == 60){
        hour += 1;
        min = 0;
    }


    }

    document.getElementById("runtime").innerHTML = (hour ? (hour > 9 ? hour : "0" + hour) : "00")
    + ":" + (min ? (min > 9 ? min : "0" + min) : "00") + ":" + (sec > 9 ? sec : "0"
        + sec);
};


    $(document).delegate('#startcall','click',function(){ 
        event.preventDefault()
        $('.all_tags').fadeIn(100);
        tagcall();
        $('#call_note_text').removeAttr('disabled');
        start();
       $('.timer').fadeIn(500);
       $(this).toggleClass('fadew');

    })

    $(document).delegate('#stopcall','click',function(){
        var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');

            var noteval = $('#call_note_text').val();
            if(noteval == '')
            {
                alert('entert the notes');
            }
            else
            {
                stop();
                $('.all_tags').fadeOut(100);
                    var call_status = $('#call_note_text').val();
                    var user_id = $('#user_id').val();
                    var lead_id = $('#lead_id').val();
                    var duration = $('#runtime').html();
                $.ajax({

                    type:'POST',
                    url: '/crmnest/call/store',
                    data: {_token: CSRF_TOKEN, call_status:call_status,user_id: user_id,lead_id: lead_id,duration:duration},
                    success:function(data){
                      _showCall()
                           //      var d = new Date(data.message.created_at);
                           //
                           // var html =  ` <div aria-live="polite" aria-atomic="true" style="position: relative; min-height: 100px;" id="deleteall${data.id}">
                           //                  <!-- Position it -->
                           //                  <div style="position: absolute; top: 0; left: 0" class="noteinterface">
                           //
                           //                      <!-- Then put toasts within -->
                           //
                           //                      <div class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true" data-toggle="toast">
                           //                          <div class="toast-header">
                           //                              <i class="mdi mdi-circle-slice-8 font-18 mr-1 text-warning"></i>
                           //                              <strong class="mr-auto">${d.toDateString()}</strong>
                           //                              <small class="text-muted"></small>
                           //                              <button type="button" class="ml-2 mb-1 close close_call_button" data-dismiss="toast" aria-label="Close" data-id="${data.id}">
                           //                              <span aria-hidden="true">×</span>
                           //                              </button>
                           //                          </div>
                           //                           <div class="toast-body">
                           //
                           //                        <div class="call-body">
                           //
                           //                             <div class="float-left">${data.message.call_status}</div>
                           //                          <div class="float-right">${data.message.duration}</div>
                           //
                           //                        </div>
                           //                          </div>
                           //
                           //                      </div> <!--end toast-->
                           //
                           //
                           //
                           //
                           //                  </div>
                           //
                           //              </div> `;
                           //
                           //              $('.pre').prepend(html);

                    }
                });

                $('#call_note_text').val('');
                $('.timer').fadeOut(100);
                $('#runtime').html('00:00:00');
                $('#startcall').removeClass('fadew');
                $('#call_note_text').prop('disabled',true);

            }

    })

     $(document).on('click', '.pagination a', function(event){
  event.preventDefault();
  var page = $(this).attr('href').split('page=')[1];
  var html = '';
    $.ajax({
   url:"http://kafesta.com/crmnest/call/fetch_data?page="+page,
   success:function(data)
   {
    $.each(data,function(index,value){

        $.each(value.data,function(index,value){

                var d = new Date(value.created_at);
                html +=  ` <div aria-live="polite" aria-atomic="true" style="position: relative; min-height: 100px;">
                                            <!-- Position it -->
                                            <div style="position: absolute; top: 0; left: 0" class="noteinterface">

                                                <!-- Then put toasts within -->

                                                <div class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true" data-toggle="toast">
                                                    <div class="toast-header">
                                                        <i class="mdi mdi-circle-slice-8 font-18 mr-1 text-warning"></i>
                                                        <strong class="mr-auto">${d.toDateString()}</strong>
                                                        <small class="text-muted"></small>
                                                        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                                        <span aria-hidden="true">×</span>
                                                        </button>
                                                    </div>
                                                     <div class="toast-body">

                                                  <div class="call-body">

                                                       <div class="float-left">${value.call_status}</div>
                                                    <div class="float-right">${value.duration}</div>

                                                  </div>
                                                    </div>

                                                </div> <!--end toast-->




                                            </div>

                                        </div> `;

                                        $('.all').html(html);

        })
    })
   }
  });

 });

    $(document).delegate('#add-note','click',function(){

       event.preventDefault();
       var notes = $('#note_text_area').val(),
       user_id = $('#note_user_id').val(),
       lead_id = $('#note_lead_id').val();
       $.ajax({

           type: 'post',
           url: '/crmnest/note/store',
           dataType: "json",
           data: {_token: CSRF_TOKEN,message:notes,lead_id:lead_id,user_id:user_id},
           success:function(data)
           {

             _showNotes();
             $('#note_text_area').val('');
             $('#note_text_area').val('');

                      // var d = new Date(data.notes.created_at);
                      //
                      //      var html =  ` <div aria-live="polite" aria-atomic="true" style="position: relative; min-height: 100px;" id="delenotes${data.notes.id}">
                      //                       <!-- Position it -->
                      //                       <div style="position: absolute; top: 0; left: 0" class="noteinterface">
                      //
                      //                           <!-- Then put toasts within -->
                      //
                      //                           <div class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true" data-toggle="toast">
                      //                               <div class="toast-header">
                      //                                   <i class="mdi mdi-circle-slice-8 font-18 mr-1 text-warning"></i>
                      //                                   <strong class="mr-auto">${d.toLocaleString('en-US')}</strong>
                      //                                   <small class="text-muted">${data.notes.username}</small>
                      //                                   <button type="button" class="ml-2 mb-1 close dele_note_close" data-dismiss="toast" aria-label="Close" data-id="${data.notes.id}">
                      //                                   <span aria-hidden="true">×</span>
                      //                                   </button>
                      //                               </div>
                      //                                <div class="toast-body">
                      //
                      //                             <div class="call-body">
                      //
                      //                                  <div class="float-left">${data.notes.message}</div>
                      //                               <div class="float-right"></div>
                      //
                      //                             </div>
                      //                               </div>
                      //
                      //                           </div> <!--end toast-->
                      //
                      //
                      //
                      //
                      //                       </div>
                      //
                      //                   </div> `;
                      //                   $('#note_text_area').val('');
                      //                   $('.note_pre').prepend(html);

           }
       });


    });


         $('#notepagi a').on('click',function(event){
  event.preventDefault();
  var page = $(this).attr('href').split('page=')[1];
  var html = '';
    $.ajax({
   url:"https://rugs.a2hosted.com/crmnest/note/fetch_note?page="+page,
   success:function(data)
   {
    $.each(data,function(index,value){

        $.each(value.data,function(index,value){

                var d = new Date(value.created_at);
                html +=  ` <div aria-live="polite" aria-atomic="true" style="position: relative; min-height: 100px;" id="pagii${value.id}">
                                            <!-- Position it -->
                                            <div style="position: absolute; top: 0; left: 0" class="noteinterface">

                                                <!-- Then put toasts within -->

                                                <div class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true" data-toggle="toast">
                                                    <div class="toast-header">
                                                        <i class="mdi mdi-circle-slice-8 font-18 mr-1 text-warning"></i>
                                                        <strong class="mr-auto">${d.toLocaleString('en-US')}</strong>
                                                        <small class="text-muted"></small>
                                                        <button type="button" class="ml-2 mb-1 close close_all_all" data-dismiss="toast" aria-label="Close" data-id="${value.id}"><span aria-hidden="true">×</span>                                                        </button>
                                                    </div>
                                                     <div class="toast-body">

                                                  <div class="call-body">

                                                       <div class="float-left">${value.message}</div>
                                                    <div class="float-right"></div>

                                                  </div>
                                                    </div>

                                                </div> <!--end toast-->




                                            </div>

                                        </div> `;

                                        $('.note_all').html(html);

        })
    })
   }
  });

 });

 $(document).delegate('#all_fet','click',function(){

     var user_id = $(this).attr('user-id');
     var lead_id = $(this).attr('lead-id');
     var vhtml = '';
     var vhtmll = '';
     $.ajax({

         type: 'post',
         data: {_token: CSRF_TOKEN,lead_id:lead_id, user_id:user_id},
         url: 'https://rugs.a2hosted.com/crmnest/fetch/all_ev',
         success:function(data)
         {

 //             $.each(data,function(index,value){
 //
 //                 var d = new Date(value.created_at);
 //                 var m = new Date(value.date);
 //
 //                 var day = m.getDate();
 //                    var month = m.getMonth();
 //                    var year = m.getFullYear()
 //                    var hour = m.getHours();
 //                    var min = m.getMinutes();
 //                    var sec = m.getSeconds();
 //
 //                 if(value.notes)
 //                 {
 //                   vhtml +=`<div class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true" data-toggle="toast" id="deleteall${value.id}">
 //                                                    <div class="toast-header">
 //                                                        <i class="mdi mdi-circle-slice-8 font-18 mr-1 text-warning"></i>
 //                                                        <div class="mr-auto"><strong>Note : </strong>${d.toLocaleString('en-US')}</div>
 //                                                        <small class="text-muted">${value.user.name}</small>
 //                                                        <button type="button" class="ml-2 mb-1 close close_all_all" data-dismiss="toast" aria-label="Close" id="${value.id}">
 //                                                        <span aria-hidden="true">×</span>
 //                                                        </button>
 //                                                    </div>
 //                                                     <div class="toast-body">
 //
 //                                                  <div class="call-body">
 //
 //                                                       <div class="float-left">${value.notes}</div>
 //                                                    <div class="float-right"></div>
 //
 //                                                  </div></div></div>`;
 //                 }
 //                 else if(value.calls)
 //                 {
 //                               vhtml +=`<div class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true" data-toggle="toast" id="deleteall${value.id}">
 //                                                    <div class="toast-header">
 //                                                        <i class="mdi mdi-circle-slice-8 font-18 mr-1 text-warning"></i>
 //                                                        <div class="mr-auto"><strong>Call : </strong>${d.toLocaleString('en-US')}</div>
 //                                                        <small class="text-muted">${value.user.name}</small>
 //                                                        <button type="button" class="ml-2 mb-1 close close_all_all" data-dismiss="toast" aria-label="Close" data-id="${value.id}">
 //                                                        <span aria-hidden="true">×</span>
 //                                                        </button>
 //                                                    </div>
 //                                                     <div class="toast-body">
 //
 //                                                  <div class="call-body">
 //
 //                                                       <div class="float-left">${value.calls}</div>
 //                                                    <div class="float-right">${value.duration}</div>
 //
 //                                                  </div></div></div>`;
 //                 }
 //                 if(value.attachment_file)
 //                 {
 //                 if(value.format == 'jpg' || value.format == 'jpeg' || value.format == 'png')
 //                 {
 //                      vhtml +=`<div class="toast fade show mt-3 jpg" role="alert" aria-live="assertive" aria-atomic="true" data-toggle="toast" id="deleteall${value.id}">
 //                                                     <div class="toast-header">
 //                                                        <i class="mdi mdi-circle-slice-8 font-18 mr-1 text-warning"></i>
 //                                                        <span class="mr-auto">&nbsp;&nbsp;${d.toLocaleString()}</span>
 //                                                        <small class="text-muted">${value.user.name}</small>
 //                                                        <button type="button" class="ml-2 mb-1 close close_all_all" data-dismiss="toast" aria-label="Close" data-id="${value.id}">
 //                                                        <span aria-hidden="true">×</span>
 //                                                        </button>
 //                                                    </div>
 //                                                     <div class="toast-body">
 //                                                    <img src="https://rugs.a2hosted.com/crmnest/public/attachment/${value.attachment_file}" width="110" class="zoom_image" onclick="modal_show(this)"/>
 //                                                    </div>
 //
 //                                                </div>`;
 //                 }
 //                    else if(value.format == 'docx' || value.format == 'pdf')
 //                 {
 //                      vhtml +=`<div class="toast fade show mt-3 pdp" role="alert" aria-live="assertive" aria-atomic="true" data-toggle="toast" id="deleteall${value.id}">
 //                                                     <div class="toast-header">
 //                                                        <i class="mdi mdi-circle-slice-8 font-18 mr-1 text-warning"></i>
 //                                                        <span class="mr-auto">&nbsp;&nbsp;${d.toLocaleString()}</span>
 //                                                        <small class="text-muted">${value.user.name}</small>
 //                                                        <button type="button" class="ml-2 mb-1 close close_all_all" data-dismiss="toast" aria-label="Close" data-id="${value.id}">
 //                                                        <span aria-hidden="true">×</span>
 //                                                        </button>
 //                                                    </div>
 //                                                     <div class="toast-body">
 //                                                        <a href="https://rugs.a2hosted.com/crmnest/public/attachment/${value.attachment_file}" target="_blank"><i class="ti-file"></i>&nbsp;${value.filename}</a>
 //                                                    </div>
 //
 //                                                </div>`;
 //                 }
 //             }
 //                    else if(value.type == "meeting" || value.type == "email" || value.type == "call")
 //                    {
 //                      vhtml += '<div class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true" data-toggle="toast" id="deleteall'+value.id+'">';
 //                        vhtml +='<div class="toast-header">';
 // if(value.status == 'completed')
 //                    {
 //                        vhtml +='<i class="mdi mdi-circle-slice-8 font-18 mr-1 text-success"></i>';
 //                    }
 //                    else
 //                    {
 //                     vhtml +='<i class="mdi mdi-circle-slice-8 font-18 mr-1 text-danger"></i>';
 //                    }
 //                    vhtml +='<span class="mr-auto"><strong>Meeting : </strong>7 minutes ago</span>';
 //                    if(value.status == 'completed')
 //                    {
 //                    vhtml +='<span class="badge badge-soft-danger becomegreen cla94">'+value.status+'</span>   &nbsp;';
 //                    }
 //                    else if(value.status == 'overdue')
 //                    {
 //                        vhtml +='<span class="badge badge-soft-danger cla94">'+value.status+'</span>   &nbsp;';
 //                    }
 //                    vhtml +='<small class="text-muted">'+value.user.name+'</small><button type="button" class="ml-2 mb-1 close close_all_all" data-dismiss="toast" aria-label="Close" data-id="'+value.id+'">';
 //                vhtml +='<span aria-hidden="true">×</span></button></div><div class="toast-body">';
 //                vhtml +='<div class="table-responsive"><table class="table table-striped mb-0"><tbody>';
 //                vhtml +='<tr><td><div><i class="ti-calendar"></i>&nbsp;'+day+'-'+month+'-'+year+'</div><div><i class="ti-alarm-clock"></i>&nbsp;'+hour+':'+min+':'+sec+'</div> </td><td><div><strong>'+value.title+'</strong></div><div>'+value.note+'</div></td>';
 //                vhtml +='<td> <i class="fas fa-user-clock"></i>'+value.type+'</td>';
 //                    if(value.status == 'completed')
 //                    {
 //                vhtml +='<td><button type="button" class="btn btn-dark waves-effect waves-light btn-sm float-right status_complete_ajax status_complete disab" data-id="'+value.id+'">Completed</button></td>';
 //                vhtml +='</tr>';
 //                    }
 //                    else
 //                    {
 //                        vhtml +='<button type="button" class="btn btn-dark waves-effect waves-light btn-sm float-right status_complete_ajax status_complete disab" data-id="'+value.id+'">Completed</button>';
 //                    }
 //                    vhtml +='</tbody></table><!--end /table--></div></div></div>';
 //                }
 //                 $('#fet_all_all').html(vhtml);
 //             });


         }
     });

 })

$(document).on('click','.dele_note_close', function()
  {
    var ele = $(this).parent().parent().parent().parent();
    var itt = $(ele).attr('id');
      let idd = $(this).attr('data-id');
      // if(confirm('Are you sure. you want to delete this?'))
      // {
      //   $.ajax({

      //     url: '/crmnest/removenote/'+idd,
      //     success: function(data)
      //     {
      //       console.log(data);
      //     }
      //   });
      // }
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

          url: '/crmnest/removenote/'+idd,
          success: function(data)
          {

          }
        });

           $('#'+itt).fadeOut();
        }

    });

  });
    $(document).on('click','.close_call_button', function(){

        var ele = $(this).parent().parent().parent().parent();
  var itt = $(ele).attr('id');
  let idd = $(this).attr('data-id');

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

          url: '/crmnest/removeallcall/'+idd,
          success: function(data)
          {

          }
        });

           $('#'+itt).fadeOut();
        }

    });

    })

    $(document).on('click','.close_all_all_met', function(){

            var ele = $(this).parent().parent();
            var itt = $(ele).attr('id');
            let idd = $(this).attr('data-id');

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

          url: '/crmnest/deleteschedule/'+idd,
          success: function(data)
          {

           window.location.reload(true);

          }
        });

           $('#'+itt).fadeOut();
        }

    });
    })
$(document).on('click','.close_all_all', function(){

  var ele = $(this).parent().parent();
  var itt = $(ele).attr('id');
  let idd = $(this).attr('data-id');

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

          url: '/crmnest/removeallall/'+idd,
          success: function(data)
          {

          }
        });

           $('#'+itt).fadeOut();
        }

    });

})

$(document).delegate('.status_complete','click',function(){

    var id = $(this).attr('data-id');
     $(this).prop('disabled',true);
    $(this).addClass('disab');

    $.ajax({

        url: '/crmnest/schedule/status/update',
        type: 'post',
        data: {_token: CSRF_TOKEN,status: id},
        success:function(data){
            if(data == true)
            {
                $('.cla'+id).html('Completed');
                $('.cla'+id).addClass('becomegreen');

            }

        }
    });

})

$(document).delegate('.notify-alert-close .button.close','click',function(){

    $('.notify-success').hide();
})

$(document).delegate('.get_schedule','click',function(){

    var userid = $(this).attr('data-id');

    $.ajax({

        type: 'get',
        url: '/crmnest/scheduletask/get/'+userid,
        success:function(data)
        {

        }

    });
})

$('.dropify').dropify();
$(document).on('click','#saveImage',function(){

    let myForm = document.getElementById('saveForm');
    let formData = new FormData(myForm);
    uploadImage(formData);


})

});

function uploadImage(formData)
{
    $.ajaxSetup({

        headers: {

            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({

        type: 'POST',
        data: formData,
        dataType: 'json',
        contentType: false,
        processData: false,
        url: '/crmnest/attachment',
         beforeSend: function(){
        $("#loader_upl").show();
        },success:function(data){

          _showAttachment();

          $('.dropify-preview').fadeOut();
        // var formats = data.format.toLowerCase();
        // console.log('MY FORMATS'+formats)
        //
        //     $('.dropify-preview').fadeOut();
        //
        //     var file = '';
        //     var d = new Date(data.created_at);
        //     if(formats == 'jpg')
        //     {
        //         file = '<img src="http://kafesta.com/crmnest/public/attachment/'+data.attachment_file+'" width="180" onclick="modal_show(this)"/>';
        //     }
        //     else if(formats == 'png')
        //     {
        //         file = '<img src="http://kafesta.com/crmnest/public/attachment/'+data.attachment_file+'" width="180" onclick="modal_show(this)"/>';
        //     }
        //     else if(formats == 'pdf')
        //     {
        //         file = '<a href="http://kafesta.com/crmnest/public/attachment/'+data.attachment_file+'" target="_blank">'+data.filename+'</a>';
        //     }
        //     else if(formats == 'docx')
        //     {
        //       file = '<a href="http://kafesta.com/crmnest/public/attachment/'+data.attachment_file+'" target="_blank">'+data.filename+'</a>';
        //
        //     }else if(formats == 'txt'){
        //       file = '<a href="http://kafesta.com/crmnest/public/attachment/'+data.attachment_file+'" target="_blank">'+data.filename+'</a>';
        //     }
        //     var html = '<div class="toast fade show mt-3">'+
        //                                              '<div class="toast-header">'+
        //                                                 '<i class="mdi mdi-circle-slice-8 font-18 mr-1 text-warning"></i>'+
        //                                                 '<span class="mr-auto">&nbsp;&nbsp;'+d.toLocaleString()+'</span>'+
        //                                                 '<small class="text-muted">'+data.username+'</small>'+
        //
        //
        //                                                  '<button style="border: unset;background: #fff;font-size: 15px;font-weight: 600;cursor: pointer;">'+
        //                                                  '<a href="javascript:void(0);" onclick="return attachmentRemoval("'+data.id+'","'+data.filename+'");">'+
        //                                                  '<span aria-hidden="true">×</span></a>'+
        //                                                  '</button>'+
        //
        //                                             '</div>'+
        //                                              '<div class="toast-body">'+file+'</div>'+
        //
        //                                         '</div>';
        //
        //      console.log('MY FILES'+file)
        //
        //     $('#attachment_file').prepend(html);
        //     $('#attachment_file_alltab').prepend(html);


        },complete:function(data){

        $("#loader_upl").hide();
       }


    });
}


function attachmentRemoval(id,filename,leadid){
       $.ajax({
              url: '/crmnest/removeattachments',
              method:'post',
              data:{
                  _token: CSRF_TOKEN,
                  id:id,
                  filename:filename
              },
      success:function(data){
            //alert(data);
            if(data == 'success'){
                swal("Deleted!", "Deleted Successfully!", "success")
                // location.reload();
                _showAttachment();
                _showALl();
              }else{
              }
           }
      });
}

function createSchedule()
{
    var htmlback = '';
    var status = '';
    event.preventDefault();

    $.ajax({

        url: '/crmnest/schedule/store',
        type: 'post',
        data: $('#createSchedule').serialize(),
        success:function(data)
        {

                _showMeetings();
                if(data.status == 'completed')
                {
                    status = `<span class="badge badge-soft-success becomegreen cla${data.id}}">${data.status}</span>`;
                }
                else
                {
                    status = `<span class="badge badge-soft-danger cla${data.id}">${data.status}</span>`;
                }

            $('#createSchedule')[0].reset();


            htmlback = `<div class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true" data-toggle="toast" id="hehe">
                                                    <div class="toast-header">
                                                        <i class="mdi mdi-circle-slice-8 font-18 mr-1 text-warning"></i>${status}
                                                        <strong class="mr-auto"><label id="runtime" class="mt-3"></label></strong>
                                                        <small class="text-muted">${data.username}</small>
                                                        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                                        <span aria-hidden="true">×</span>
                                                        </button>
                                                    </div>
                                                     <div class="toast-body">
                                                     <div class="table-responsive">
                                        <table class="table table-striped mb-0">

                                            <tbody>
                                            <tr>
                                                <td><div><i class="ti-calendar
"></i>&nbsp;${data.date}</div><div><i class="ti-alarm-clock
"></i>&nbsp;${data.time}</div> </td>
                                                <td><div><strong>${data.type}</strong></div><div>${data.note}</div></td>
                                                <td>${data.type}</td>
                                                <td>
                                                    <button type="button" class="btn btn-dark waves-effect waves-light btn-sm float-right status_complete " data-id="${data.id}">Completed</button>
                                                </td>
                                            </tr>

                                            </tbody>
                                        </table><!--end /table-->
                                    </div>
                                                    </div>

                                                </div>`;

                $(htmlback).hide().prependTo('#all_schedule').slideToggle(500);
        }

    });
}

function showModal(id)
{
    $('.bs-example-modal-lg' + id).modal('show');
}



function tagcall()
{
     $(document).delegate('.all_tags span','click',function(){

                var tags_name = $(this).text();
                $('#call_note_text').removeAttr('disabled');
                var call_call = $('#call_note_text').val();
                if(call_call !='')
                {
                    $('#call_note_text').val('');
                    $('#call_note_text').val(tags_name);

                }
                else
                {
                    $('#call_note_text').val(tags_name);
                }
       })
}

function modal_show(data)
{
   var src = $(data).attr('src');
   var mode = `<div class="modal fade show mmodal" id="function_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" style="display: block; padding-right: 17px;" aria-modal="true">
                                                        <div class="modal-dialog" role="document">
                                                            <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title mt-0" id="exampleModalLabel">Modal title</h5>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">×</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body">
                                                      <img src="${src}" width="100%">
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-secondary" data-dismiss="modal" id="modal_close_modal">Close</button>

                                                            </div>
                                                            </div>
                                                        </div>
                                                        </div>
                                                        `;

                                                    $('#all').append(mode);

                                                    $('.mmodal').modal('show');
                                                    $('#exampleModal').remove();

}

$('#modal_close_modal').on('click',function(){


});

$('input[name="dates"]').daterangepicker({

  opens: 'left'
}, function(start, end, label){
    var start_date = start.format('YYYY-MM-DD');
    var end_date = end.format('YYYY-MM-DD');

    $.ajax({

      url: '/crmnest/monthlyleadreport',
      data: {

        _token: CSRF_TOKEN,
        start_date: start_date,
        end_date: end_date


      },
      type: 'post',
      beforeSend: function(){
          $('.loader').addClass('act');
      },
      success: function(data)
      {

        var filter_table = '';
          filter_table += '<div class="row top_bar_top"><div class="col-lg-3">';
          filter_table +='<div class="card"><div class="card-body">';
          filter_table +='<div class="row"><div class="col-4 align-self-center">';
          filter_table +='<div class="icon-info">';
          filter_table +='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"       class="feather feather-smile align-self-center icon-lg icon-dual-warning"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path>';
          filter_table +='<line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9">';
          filter_table +='</line></svg></div></div><div class="col-8 align-self-center text-right">';
          filter_table += '<div class="ml-2"><p class="mb-1 text-muted">Total Leads</p>';
          filter_table +='<h3 class="mt-0 mb-1 font-weight-semibold">';
                filter_table += data.length;
          filter_table +='</h3></div>';
          filter_table +='</div></div><div class="progress mt-2" style="height:3px;">';
          filter_table +='<div class="progress-bar bg-warning" role="progressbar" style="width: 55%;" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div></div></div><!--end card-body--></div><!--end card--></div><!--end col-->';
          filter_table +='<div class="col-lg-3"><div class="card"><div class="card-body"><div class="row"><div class="col-4 align-self-center"><div class="icon-info">';
          filter_table +='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users align-self-center icon-lg icon-dual-purple"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div></div>';
          filter_table +='<div class="col-8 align-self-center text-right"><div class="ml-2"><p class="mb-1 text-muted">Won</p>';
          filter_table +='<h3 class="mt-0 mb-1 font-weight-semibold">';
             var i = 0;
                $.each(data, function(index, value){

                  if(value.tasks.length != '')
                  {

                      $.each(value.tasks, function(index, value){

                          if(value.status.title == 'Won')
                          {
                            i++;


                          }

                      })
                  }

                })
                filter_table += i;
          filter_table +='</h3></div></div></div><div class="progress mt-2" style="height:3px;"><div class="progress-bar bg-purple" role="progressbar" style="width: 39%;" aria-valuenow="39" aria-valuemin="0" aria-valuemax="100"></div></div></div><!--end card-body--></div><!--end card--></div><!--end col--><div class="col-lg-3"><div class="card"><div class="card-body"><div class="row"><div class="col-4 align-self-center"><div class="icon-info"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-headphones align-self-center icon-lg icon-dual-success"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg></div></div><div class="col-8 align-self-center text-right">';
          filter_table +='<div class="ml-2"><p class="mb-0 text-muted">Intrested</p><h3 class="mt-0 mb-1 font-weight-semibold d-inline-block">0</h3><span class="badge badge-soft-success mt-1 shadow-none">Active</span></div></div></div><div class="progress mt-2" style="height:3px;"><div class="progress-bar bg-success" role="progressbar" style="width: 48%;" aria-valuenow="48" aria-valuemin="0" aria-valuemax="100"></div></div></div><!--end card-body--></div><!--end card--></div><!--end col--><div class="col-lg-3"><div class="card"><div class="card-body"><div class="row"><div class="col-sm-4 col-4 align-self-center"><div class="icon-info"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-square align-self-center icon-lg icon-dual-pink"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg></div></div><div class="col-sm-8 col-8 align-self-center text-right">';
          filter_table +='<div class="ml-2"><p class="mb-1 text-muted">Not Intrested</p><h3 class="mt-0 mb-1 font-weight-semibold">';
                  var ni = 0;
                  $.each(data, function(index, value){
                      if(value.length !='')
                      {
                        if(value.status == 'NI Lead')
                        {
                            ni++;
                        }
                      }
                  });
                  filter_table += ni;
          filter_table +='</h3></div></div></div><div class="progress mt-2" style="height:3px;"><div class="progress-bar bg-pink" role="progressbar" style="width: 22%;" aria-valuenow="22" aria-valuemin="0" aria-valuemax="100"></div></div></div><!--end card-body--></div><!--end card--></div><!--end col--></div>';
        filter_table +='<div class="card"><div class="card-body" id="download-export"><table id="datatable_info" class="table dataTable no-footer" role="grid" aria-describedby="datatable_info">';
                    filter_table +='<thead class="thead-light"><tr role="row"><th class="sorting_asc" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Lead: activate to sort column descending" style="width: 201px;">Name</th>';
                    filter_table +='<th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Email: activate to sort column ascending" style="width: 139px;">Email</th><th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Company: activate to sort column ascending" style="width: 148px;">Contact</th>';
                    filter_table +='<th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style="width: 70px;">Address</th>';
                    filter_table +='<th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style="width: 70px;">Lead Source</th>';
                    filter_table +='<th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style="width: 70px;">Lead Owner</th>';
                    filter_table +='<th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style="width: 70px;">Status</th>';
                    filter_table +='<th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style="width: 70px;">Call</th>';
                    filter_table +='</tr></thead><tbody>';

                  $.each(data, function(index, value){

                      filter_table +='<tr>';
                        filter_table +='<td>'+value.firstname+' '+value.surname+'</td>';
                        filter_table +='<td>'+value.email+'</td>';
                        filter_table +='<td>'+value.mobilenumber+'</td>';
                        filter_table +='<td>'+value.address+','+value.town+','+value.country+'</td>';
                        filter_table +='<td>'+value.leadsource+'</td>';
                        filter_table +='<td>'+value.user_id+'</td>';
                        filter_table +='<td>'+value.status+'</td>';
                        filter_table +='<td><span class="todo_call" onclick="showCall({{$todo->id}})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-phone-call"><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></i></span></td>';
                      filter_table +='</tr>';

                  })

            filter_table +='</thead><tbody></table></div></div>';





        $('.get_data_month').html(filter_table);
      },
      complete: function()
      {
        $('.loader').removeClass('act');
      }

    });
});
var start = moment().subtract(29, 'days');
var end = moment();

function salescb(start, end){
    loadsaleschart(start, end);
    loadsalespiechart(start, end);
    loadsalespiechartone(start, end);
    var leadsou = $('select[name="leadsourcefilter"]').val();
       var start_date = start.format('YYYY-MM-DD');
        var end_date = end.format('YYYY-MM-DD');
        var data = {

      start_date: start_date,
      end_date: end_date,
      _token: CSRF_TOKEN

        }
  $.ajax({

    url: '/crmnest/filtersalesreport',
    data: {
      leadsource:$('select[name="leadsourcefilter"]').val(),
      leadowner:$('select[name="leadownerfilter"]').val(),
      start_date: start_date,
      end_date: end_date,
      _token: CSRF_TOKEN
    },
    type: 'post',
    beforeSend: function(){
        $('.loader').addClass('act');
    },
    success: function(data)
    {

    console.log("Datenot: ", data);



      var filter_table = '';
      filter_table +='</h3></div></div></div><div class="progress mt-2" style="height:3px;"><div class="progress-bar bg-pink" role="progressbar" style="width: 22%;" aria-valuenow="22" aria-valuemin="0" aria-valuemax="100"></div></div></div><!--end card-body--></div><!--end card--></div><!--end col--></div>';
      filter_table +='<div class="card"><div class="card-body"><div class="row d-flex justify-content-end mr-1"><button type="button" onClick="exportTableToExcel(\'' + 'datatable-info' + '\')" id="btnExport" class="btn btn-primary waves-effect mb-3" style="box-shadow:none">Export</button></div><table id="datatable-info" class="table dataTable no-footer" role="grid" aria-describedby="datatable_info">';
                  filter_table +='<thead class="thead-light"><tr role="row"><th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1">ID</th><th class="sorting_asc" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Lead: activate to sort column descending" style="width: 201px;">Name</th>';
                  filter_table +='<th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Email: activate to sort column ascending" style="width: 139px;">Lead Assigned</th><th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Company: activate to sort column ascending" style="width: 148px;">Quotes Generated</th>';
                  filter_table +='<th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style="width: 70px;">Deal Created</th>';
                  filter_table +='<th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style="width: 70px;">Total Deal Amount</th>';
                  filter_table +='<th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style="width: 70px;">Total Sales Closed</th>';
                  filter_table +='<th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style="width: 70px;">Total Metting Schedule</th>';
                  filter_table +='</tr></thead><tbody>';
              if(data.length !='')
              {
                $.each(data, function(index, value){

                      filter_table +='<tr>';
                      filter_table +='<td>'+(index + 1)+'</td>';
                      filter_table +='<td>'+value.name+'</td>';
                      filter_table +='<td>'+value.lead+'</td>';
                      filter_table +='<td>'+value.quote+'</td>';
                      filter_table +='<td>'+value.totaldeal+'</td>';
                      filter_table +='<td>'+value.totaldealamount+'</td>';
                      filter_table +='<td>'+value.totalsalesclosed+'</td>';
                      filter_table +='<td>'+value.mettingschedule+'</td>';
                      filter_table +='</tr>';

                });
            }
            else
            {
              filter_table +='<tr><td colspan="8">No data Found</td></tr>';
            }

          filter_table +='</thead><tbody></table></div></div></div>';





      $('.get_sales_data_month').html(filter_table);
    },
    complete: function()
    {
      $('.loader').removeClass('act');
    }

  });

}


    function cb(start, end) {
      loadchart(start, end);
      loadpiechart(start, end);
      loadpiechartone(start,end);
    	var leadsou = $('select[name="leadsourcefilter"]').val();
      var start_date = start.format('YYYY-MM-DD');
      var end_date = end.format('YYYY-MM-DD');
      var data = {

        start_date: start_date,
        end_date: end_date,
        _token: CSRF_TOKEN

          }
    $.ajax({

      url: '/crmnest/monthlyleadreport',
      data: {
      	leadsource:$('select[name="leadsourcefilter"]').val(),
      	leadowner:$('select[name="leadownerfilter"]').val(),
        start_date: start_date,
        end_date: end_date,
        _token: CSRF_TOKEN
      },
      type: 'post',
      beforeSend: function(){
          $('.loader').addClass('act');
      },
      success: function(data)
      {

              var date = [];
              var count = [];
                $.each(data.graph, function(index, value){

                date.push(value.date);
                count.push(value.count);

            })

      addgraph(count, date);


        var filter_table = '';
          filter_table += '<div class="container-fluid"><div class="top_bar_top"><div class="col-lg-3">';
          filter_table +='<div class="card"><div class="card-body">';
          filter_table +='<div class="row"><div class="col-4 align-self-center">';
          filter_table +='<div class="icon-info">';
          filter_table +='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"       class="feather feather-smile align-self-center icon-lg icon-dual-warning"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path>';
          filter_table +='<line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9">';
          filter_table +='</line></svg></div></div><div class="col-8 align-self-center text-right">';
          filter_table += '<div class="ml-2"><p class="mb-1 text-muted">Total Leads</p>';
          filter_table +='<h3 class="mt-0 mb-1 font-weight-semibold">';
                filter_table += data.dat.length;
          filter_table +='</h3></div>';
          filter_table +='</div></div><div class="progress mt-2" style="height:3px;">';
          filter_table +='<div class="progress-bar bg-warning" role="progressbar" style="width: 55%;" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div></div></div><!--end card-body--></div><!--end card--></div><!--end col-->';
          filter_table +='<div class="col-lg-3"><div class="card"><div class="card-body"><div class="row"><div class="col-4 align-self-center"><div class="icon-info">';
          filter_table +='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users align-self-center icon-lg icon-dual-purple"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div></div>';
          filter_table +='<div class="col-8 align-self-center text-right"><div class="ml-2"><p class="mb-1 text-muted">Won</p>';
          filter_table +='<h3 class="mt-0 mb-1 font-weight-semibold">';
             var i = 0;
                $.each(data.dat, function(index, value){

                  if(value.tasks.length != '')
                  {

                      $.each(value.tasks, function(index, value){

                          if(value.status.title == 'Won')
                          {
                            i++;


                          }

                      })
                  }

                })
                filter_table += i;
          filter_table +='</h3></div></div></div><div class="progress mt-2" style="height:3px;"><div class="progress-bar bg-purple" role="progressbar" style="width: 39%;" aria-valuenow="39" aria-valuemin="0" aria-valuemax="100"></div></div></div><!--end card-body--></div><!--end card--></div><!--end col--><div class="col-lg-3"><div class="card"><div class="card-body"><div class="row"><div class="col-4 align-self-center"><div class="icon-info"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-headphones align-self-center icon-lg icon-dual-success"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg></div></div><div class="col-8 align-self-center text-right">';
          filter_table +='<div class="ml-2"><p class="mb-0 text-muted">Intrested</p><h3 class="mt-0 mb-1 font-weight-semibold d-inline-block">0</h3><span class="badge badge-soft-success mt-1 shadow-none">Active</span></div></div></div><div class="progress mt-2" style="height:3px;"><div class="progress-bar bg-success" role="progressbar" style="width: 48%;" aria-valuenow="48" aria-valuemin="0" aria-valuemax="100"></div></div></div><!--end card-body--></div><!--end card--></div><!--end col--><div class="col-lg-3"><div class="card"><div class="card-body"><div class="row"><div class="col-sm-4 col-4 align-self-center"><div class="icon-info"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-square align-self-center icon-lg icon-dual-pink"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg></div></div><div class="col-sm-8 col-8 align-self-center text-right">';
          filter_table +='<div class="ml-2"><p class="mb-1 text-muted">Not Intrested</p><h3 class="mt-0 mb-1 font-weight-semibold">';
                  var ni = 0;
                  $.each(data.dat, function(index, value){
                      if(value.length !='')
                      {
                        if(value.status == 'NI Lead')
                        {
                            ni++;
                        }
                      }
                  });
                  filter_table += ni;
          filter_table +='</h3></div></div></div><div class="progress mt-2" style="height:3px;"><div class="progress-bar bg-pink" role="progressbar" style="width: 22%;" aria-valuenow="22" aria-valuemin="0" aria-valuemax="100"></div></div></div><!--end card-body--></div><!--end card--></div><!--end col--></div>';
        filter_table +='<div class="card"><div class="card-body"><div class="row d-flex justify-content-end mr-1"><form action="/crmnest/daterangefilter" method="post"><input type="hidden" name="start_date" value="'+start_date+'"><input type="hidden" name="end_date" value="'+end_date+'"><input type="hidden" name="leadsource" value="'+leadsou+'"><button type="submit" class="btn btn-primary waves-effect mb-3" style="box-shadow:none">Export</button></form></div><table id="datatable" class="table dataTable no-footer" role="grid" aria-describedby="datatable_info">';
                    filter_table +='<thead class="thead-light"><tr role="row"><th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1">ID</th><th class="sorting_asc" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Lead: activate to sort column descending" style="width: 201px;">Name</th>';
                    filter_table +='<th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Email: activate to sort column ascending" style="width: 139px;">Email</th><th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Company: activate to sort column ascending" style="width: 148px;">Contact</th>';
                    filter_table +='<th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style="width: 70px;">Address</th>';
                    filter_table +='<th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style="width: 70px;">Lead Source</th>';
                    filter_table +='<th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style="width: 70px;">Lead Owner</th>';
                    filter_table +='<th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style="width: 70px;">Status</th>';
                    filter_table +='</tr></thead><tbody>';
        				if(data.length !='')
        				{
                  $.each(data.dat, function(index, value){

                      filter_table +='<tr>';
                      filter_table +='<td>'+(index + 1)+'</td>';
                        filter_table +='<td>'+value.firstname+' '+value.surname+'</td>';
                        filter_table +='<td>'+value.email+'</td>';
                        filter_table +='<td>'+value.mobilenumber+'</td>';
                        filter_table +='<td>'+value.address+','+value.town+','+value.country+'</td>';
                        filter_table +='<td>'+value.leadsource+'</td>';

                        if(value.assignes.length !='')
                        {
                        	$.each(value.assignes, function(index, value){

                        		filter_table +='<td>'+value.name+'</td>';

                        	});
                        }
                        filter_table +='<td>'+value.status+'</td>';
                      filter_table +='</tr>';

                  });
              }
              else
              {
              	filter_table +='<tr><td colspan="8">No data Found</td></tr>';
              }

            filter_table +='</thead><tbody></table></div></div></div>';





        $('.get_data_month').html(filter_table);
      },
      complete: function()
      {
        $('.loader').removeClass('act');
      }

    });
    }

function salesapec(start, end){
      console.log(start);
}
function apec(start, end){
  console.log(start);
}

function cb1(start, end,leadsource) {

    	var leadsou = $('select[name="leadsourcefilter"]').val();
    	console.log(start);
         var start_date = start;
          var end_date = end;

    $.ajax({

      url: '/crmnest/monthlyleadreport',
      data: {
      	leadsource:leadsource,
        start_date: start_date,
        end_date: end_date,
        _token: CSRF_TOKEN

      },
      type: 'post',
      beforeSend: function(){
          $('.loader').addClass('act');
      },
      success: function(data)
      {
        console.log(data.dat);
        var filter_table = '';
          filter_table += '<div class="container-fluid"><div class="top_bar_top"><div class="col-lg-3">';
          filter_table +='<div class="card"><div class="card-body">';
          filter_table +='<div class="row"><div class="col-4 align-self-center">';
          filter_table +='<div class="icon-info">';
          filter_table +='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"       class="feather feather-smile align-self-center icon-lg icon-dual-warning"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path>';
          filter_table +='<line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9">';
          filter_table +='</line></svg></div></div><div class="col-8 align-self-center text-right">';
          filter_table += '<div class="ml-2"><p class="mb-1 text-muted">Total Leads</p>';
          filter_table +='<h3 class="mt-0 mb-1 font-weight-semibold">';
                filter_table += data.dat.length;
          filter_table +='</h3></div>';
          filter_table +='</div></div><div class="progress mt-2" style="height:3px;">';
          filter_table +='<div class="progress-bar bg-warning" role="progressbar" style="width: 55%;" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div></div></div><!--end card-body--></div><!--end card--></div><!--end col-->';
          filter_table +='<div class="col-lg-3"><div class="card"><div class="card-body"><div class="row"><div class="col-4 align-self-center"><div class="icon-info">';
          filter_table +='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users align-self-center icon-lg icon-dual-purple"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div></div>';
          filter_table +='<div class="col-8 align-self-center text-right"><div class="ml-2"><p class="mb-1 text-muted">Won</p>';
          filter_table +='<h3 class="mt-0 mb-1 font-weight-semibold">';
             var i = 0;
                $.each(data.dat, function(index, value){

                  if(value.tasks.length != '')
                  {

                      $.each(value.tasks, function(index, value){

                          if(value.status.title == 'Won')
                          {
                            i++;


                          }

                      })
                  }

                })
                filter_table += i;
          filter_table +='</h3></div></div></div><div class="progress mt-2" style="height:3px;"><div class="progress-bar bg-purple" role="progressbar" style="width: 39%;" aria-valuenow="39" aria-valuemin="0" aria-valuemax="100"></div></div></div><!--end card-body--></div><!--end card--></div><!--end col--><div class="col-lg-3"><div class="card"><div class="card-body"><div class="row"><div class="col-4 align-self-center"><div class="icon-info"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-headphones align-self-center icon-lg icon-dual-success"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg></div></div><div class="col-8 align-self-center text-right">';
          filter_table +='<div class="ml-2"><p class="mb-0 text-muted">Intrested</p><h3 class="mt-0 mb-1 font-weight-semibold d-inline-block">0</h3><span class="badge badge-soft-success mt-1 shadow-none">Active</span></div></div></div><div class="progress mt-2" style="height:3px;"><div class="progress-bar bg-success" role="progressbar" style="width: 48%;" aria-valuenow="48" aria-valuemin="0" aria-valuemax="100"></div></div></div><!--end card-body--></div><!--end card--></div><!--end col--><div class="col-lg-3"><div class="card"><div class="card-body"><div class="row"><div class="col-sm-4 col-4 align-self-center"><div class="icon-info"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-square align-self-center icon-lg icon-dual-pink"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg></div></div><div class="col-sm-8 col-8 align-self-center text-right">';
          filter_table +='<div class="ml-2"><p class="mb-1 text-muted">Not Intrested</p><h3 class="mt-0 mb-1 font-weight-semibold">';
                  var ni = 0;
                  $.each(data.dat, function(index, value){
                      if(value.length !='')
                      {
                        if(value.status == 'NI Lead')
                        {
                            ni++;
                        }
                      }
                  });
                  filter_table += ni;
          filter_table +='</h3></div></div></div><div class="progress mt-2" style="height:3px;"><div class="progress-bar bg-pink" role="progressbar" style="width: 22%;" aria-valuenow="22" aria-valuemin="0" aria-valuemax="100"></div></div></div><!--end card-body--></div><!--end card--></div><!--end col--></div>';
        filter_table +='<div class="card"><div class="card-body"><div class="row d-flex justify-content-end mr-1"><form action="/crmnest/daterangefilter" method="post"><input type="hidden" name="start_date" value="'+start_date+'"><input type="hidden" name="end_date" value="'+end_date+'"><input type="hidden" name="leadsource" value="'+leadsou+'"><button type="submit" class="btn btn-primary waves-effect mb-3" style="box-shadow:none">Export</button></form></div><table id="datatable" class="table dataTable no-footer" role="grid" aria-describedby="datatable_info">';
                    filter_table +='<thead class="thead-light"><tr role="row"><th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1">ID</th><th class="sorting_asc" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Lead: activate to sort column descending" style="width: 201px;">Name</th>';
                    filter_table +='<th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Email: activate to sort column ascending" style="width: 139px;">Email</th><th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Company: activate to sort column ascending" style="width: 148px;">Contact</th>';
                    filter_table +='<th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style="width: 70px;">Address</th>';
                    filter_table +='<th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style="width: 70px;">Lead Source</th>';
                    filter_table +='<th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style="width: 70px;">Lead Owner</th>';
                    filter_table +='<th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style="width: 70px;">Status</th>';
                    filter_table +='</tr></thead><tbody>';
        				if(data.length !='')
        				{
                  $.each(data.dat, function(index, value){

                      filter_table +='<tr>';
                      filter_table +='<td>'+(index + 1)+'</td>';
                        filter_table +='<td>'+value.firstname+' '+value.surname+'</td>';
                        filter_table +='<td>'+value.email+'</td>';
                        filter_table +='<td>'+value.mobilenumber+'</td>';
                        filter_table +='<td>'+value.address+','+value.town+','+value.country+'</td>';
                        filter_table +='<td>'+value.leadsource+'</td>';

                        if(value.assignes.length !='')
                        {
                        	$.each(value.assignes, function(index, value){

                        		filter_table +='<td>'+value.name+'</td>';

                        	});
                        }
                        filter_table +='<td>'+value.status+'</td>';
                      filter_table +='</tr>';

                  });
              }
              else
              {
              	filter_table +='<tr><td colspan="8">No data Found</td></tr>';
              }

            filter_table +='</thead><tbody></table></div></div></div>';





        $('.get_data_month').html(filter_table);
      },
      complete: function()
      {
        $('.loader').removeClass('act');
      }

    });
    }

    	// $('select[name="leadownerfilter"]').val();

    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        onSelect: function()
        {
            apec(startDate, endDate);
        }
    }, cb);

    cb(start, end);
    apec(start, end);
// setInterval(function(){
//     show_reminder();
// },1000);

/*Custom script by prabhat start*/
    $('#salesreportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        onSelect: function()
        {
            salesapec(startDate, endDate);
        }
    }, salescb);

    salescb(start, end);
    salesapec(start, end);
/*Custom script by prabhat end*/

function show_reminder()
{

    var today = new Date();
    var date = today.getFullYear()+'-'+('0'+(today.getMonth()+1)).slice(-2)+'-'+today.getDate();
    var hour = today.getHours();

    var min = today.getMinutes();

    var sec = today.getSeconds();

    if(min < 10)
    {
        min = '0' + min;
    }
    if(sec < 10)
    {
        sec = '0' + sec;
    }

    var times = hour + ':' + min + ':' + sec;

    var CurrentDateTime = date+' '+times;
    var userid = sessionStorage.getItem("userid");
    // console.log(userid);
    // console.log(date);
    // console.log(times);
        $.ajaxSetup({

        headers: {

            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({

        url: '/crmnest/shownotification',
        type: 'post',
        data: {user_id: userid},
        success: function(data)
        {
           $.each(data,function(index, value){
               //console.log(value);
               //console.log(value);
               if(times == value.time && date == value.date)
               {
                   //alert(value.id);
                        updateScheduletask(value.id);



               }
           })
        }
    });
}

function updateScheduletask(data)
{
    alert('overdue');
         $.ajaxSetup({

        headers: {

            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
           $.ajax({

                       url: '/crmnest/scheduletask/update',
                       data: {id: data},
                       type: 'post',
                       success: function(data){
                           console.log(data);
                           $('.cla'+data).addClass('overdue');
                           $('.cla'+data).html('overdue');
                       }
                   });
}

   function apexchartload()
    {
        var startDate = moment($('#reportrange').data('daterangepicker').startDate,'YYYY-MM-DD').toDate();
        var endDate = moment($('#reportrange').data('daterangepicker').endDate,'YYYY-MM-DD').toDate();

        var sdate = new Date(startDate);
var edate = new Date(endDate);
var startfulldate = sdate.getFullYear()+'-'+('0'+(sdate.getMonth()+1)).slice(-2)+'-'+sdate.getDate();

  var endfulldate = edate.getFullYear()+'-'+('0'+(edate.getMonth()+1)).slice(-2)+'-'+edate.getDate();
    }


$(document).on('change','select[name="leadsourcefilter"]',function(){
	var val = $(this).val();
	getFiltersource(val);

})


function getFiltersource(value)
{

var startDate = moment($('#reportrange').data('daterangepicker').startDate,'YYYY-MM-DD').toDate();
var endDate = moment($('#reportrange').data('daterangepicker').endDate,'YYYY-MM-DD').toDate();

var sdate = new Date(startDate);
var edate = new Date(endDate);
var startfulldate = sdate.getFullYear()+'-'+('0'+(sdate.getMonth()+1)).slice(-2)+'-'+sdate.getDate();

	var endfulldate = edate.getFullYear()+'-'+('0'+(edate.getMonth()+1)).slice(-2)+'-'+edate.getDate();
	cb1(startfulldate, endfulldate,value);

}

for (var ts2 = 14844186e5, dates = [], spikes = [5, -5, 3, -3, 8, -8], i = 0; i < 120; i++) {
    var innerArr = [(ts2 += 864e5), dataSeries[1][i].value];
    dates.push(innerArr);
}



function loadsaleschart(start, end)
{


   var salstart = start.format('YYYY-MM-DD');
    var salend = end.format('YYYY-MM-DD');
    var data = {

      start_date: salstart,
      end_date: salend,
      _token: CSRF_TOKEN
    };

    $.post('/crmnest/monthlysalesleadreport',data, function(datas){

   console.log("hmm: ", datas);


          var saleschart = new CanvasJS.Chart("saleschartContainer", {
            title: {
              text: ""
            },

            axisY:{
              interval: 1,
            },
            axisX:{
              valueFormatString: "Sample #"
            },
            data: [
              {
                  type: "column",
                  dataPoints: datas
              }
              ]
          });


//     var saleschart = new CanvasJS.Chart("saleschartContainer", {
//   animationEnabled: true,
//   theme: "light2", // "light1", "light2", "dark1", "dark2"
//   title: {
//     text: ""
//   },
//   axisY: {
//     title: "Number of Users"
//   },
//   data: [{
//     type: "column",
//     dataPoints: datas
//   }]
// });
saleschart.render();

   //  var saleschart = new CanvasJS.Chart("saleschartContainer", {
   // 	animationEnabled: true,
   // 	exportEnabled: true,
   // 	theme: "light1", // "light1", "light2", "dark1", "dark2"
   // 	title:{
   // 		text: ""
   // 	},
   // 	data: [{
   // 		type: "column", //change type to bar, line, area, pie, etc
   // 		indexLabel: "{y}", //Shows y value on all Data Points
   // 		indexLabelFontColor: "#5A5757",
   // 		indexLabelPlacement: "outside",
   // 		dataPoints: data
   // 	}]
   // });
   // saleschart.render();

    });



}


function loadchart(start, end)
{


   var start = start.format('YYYY-MM-DD');
    var end = end.format('YYYY-MM-DD');
    var data = {

      start_date: start,
      end_date: end,
      _token: CSRF_TOKEN
    };
    var arrt = new Array();
    var ss = [];
    $.post('/crmnest/monthlyleadreport',data, function(data){


        var date = [];
        var count = [];

    });



}


function loadsalespiechart(start,end){
 var dstart = start.format('YYYY-MM-DD');
 var dend = end.format('YYYY-MM-DD');
 var data = {

        _token: CSRF_TOKEN,
   start_date: dstart,
   end_date: dend

 };

 $.post('/crmnest/totalmettingschedule',data, function(data){
   console.log("Totalmettingschedule: ", data);
     var chartmettings = new CanvasJS.Chart("chartContainermeschedule", {
       animationEnabled: true,
       title: {
         text: "Total Metting Schedule"
       },
       subtitles: [{
         text: "",
       }],
       data: [{
         type: "pie",
         yValueFormatString: "#,##0\"\"",
         indexLabel: "{label} ({y})",
         dataPoints: data
       }]
     });
     chartmettings.render();
   });
}


function loadsalespiechartone(start,end){
 var dstart = start.format('YYYY-MM-DD');
 var dend = end.format('YYYY-MM-DD');
 var data = {

        _token: CSRF_TOKEN,
   start_date: dstart,
   end_date: dend

 };

 $.post('/crmnest/totalsalesclosed',data, function(data){
   console.log("Totalsalesclosed: ", data);
     var chartsalesclosed = new CanvasJS.Chart("chartContainersalesclosed", {
       animationEnabled: true,
       title: {
         text: "Total Sales Closed"
       },
       subtitles: [{
         text: "",
       }],
       data: [{
         type: "pie",
         yValueFormatString: "#,##0\"\"",
         indexLabel: "{label} ({y})",
         dataPoints: data
       }]
     });
     chartsalesclosed.render();
   });
}



function loadpiechart(start,end){
  var dstart = start.format('YYYY-MM-DD');
   var dend = end.format('YYYY-MM-DD');
   var data = {

          _token: CSRF_TOKEN,
     start_date: dstart,
     end_date: dend

   };

   $.post('/crmnest/weeklymonthlyleadreport',data, function(data){

       var chart4 = new CanvasJS.Chart("chartContainer4", {
         animationEnabled: true,
         title: {
           text: "Lead Assigned To"
         },
         subtitles: [{
           text: "",
         }],
         data: [{
           type: "pie",
           yValueFormatString: "#,##0\"\"",
           indexLabel: "{label} ({y})",
           dataPoints: data
         }]
       });
       chart4.render();
     });
}

function loadpiechartone(start,end){
  var estart = start.format('YYYY-MM-DD');
   var eend = end.format('YYYY-MM-DD');
   var data = {

     _token: CSRF_TOKEN,
     start_date: estart,
     end_date: eend

   };

   $.post('/crmnest/weeklymonthlyleadreportone',data, function(data){

   var chart5 = new CanvasJS.Chart("chartContainer5", {
  animationEnabled: true,
  title: {
    text: "Lead Generated From"
  },
  subtitles: [{
    text: "",
  }],
  data: [{
    type: "pie",
    yValueFormatString: "#,##0\"\"",
    indexLabel: "{label} ({y})",
    dataPoints: data
  }]
 });

 chart5.render();
  });
}






function addgraph(count, date)
{


   var options = {
          series: [{
          name: 'Leads',
          data: count
        }],
          chart: {
          height: 350,
          type: 'line',
        },
        stroke: {
          width: 7,
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: date,
        },
        title: {
          text: '',
          align: 'left',
          style: {
            fontSize: "16px",
            color: '#666'
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            gradientToColors: [ '#FDD835'],
            shadeIntensity: 1,
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
          },
        },
        markers: {
          size: 4,
          colors: ["#F00"],
          strokeColors: "#00F",
          strokeWidth: 2,
          hover: {
            size: 7,
          }
        },
        yaxis: {
          min: 0,
          max: 10,
          stepSize: 20,
          title: {
            text: 'Leads',
          },
        }
        };



        var chart = new ApexCharts(document.querySelector("#apex_line1"), options);
        chart.render();
        try{
chart.updateOptions({
   series: [{
          data: count
        }],
        xaxis: {
          categories: date,
        },
})
}
catch(e){
// alert(e)
}
}

$('.parent_templ > li').on('click', function(){

      if($(this).children('.child').length > 0 && $(this).children('.showChild').length == 0)
      {
        $(this).children('.child').addClass('showChild');
      }
      else
      {
        $(this).children('.child').removeClass('showChild');
      }

})

$('#con').on('click', function(){
  if($(this).is(':checked'))
  {
    $('.scheduling').addClass('block');
  }
  else
  {
    $('.scheduling').removeClass('block');
  }
})

tinymce.init({
        selector: '#myarea',
        menubar:false,
        toolbar: 'mybutton',
        setup: function (editor) {
    /* Menu items are recreated when the menu is closed and opened, so we need
       a variable to store the toggle menu item state. */
    var toggleState = false;

    /* example, adding a toolbar menu button */
    editor.ui.registry.addMenuButton('mybutton', {
      text: 'custom values',
      fetch: function (callback) {
        var items = [
          {
            type: 'nestedmenuitem',
            text: 'Contact',
            getSubmenuItems: function () {
              return [
                {
                  type: 'menuitem',
                  text: 'Full Name',
                  onAction: function () {
                    editor.insertContent('{{lead.name}}');
                  }
                },
                {
                  type: 'menuitem',
                  text: 'First Name',
                  onAction: function () {
                    editor.insertContent('{{lead.firstname}}');
                  }
                },
                 {
                  type: 'menuitem',
                  text: 'Last Name',
                  onAction: function () {
                    editor.insertContent('{{lead.lastname}}');
                  }
                },
                   {
                  type: 'menuitem',
                  text: 'Email',
                  onAction: function () {
                    editor.insertContent('{{lead.email}}');
                  }
                },
                   {
                  type: 'menuitem',
                  text: 'Phone',
                  onAction: function () {
                    editor.insertContent('{{lead.phone}}');
                  }
                },
                    {
                  type: 'menuitem',
                  text: 'Company Name',
                  onAction: function () {
                    editor.insertContent('{{lead.companyname}}');
                  }
                },
                    {
                  type: 'menuitem',
                  text: 'Full Address',
                  onAction: function () {
                    editor.insertContent('{{lead.address}}');
                  }
                },
              ];
            }
          },
          {
            type: 'nestedmenuitem',
            text: 'User',
            getSubmenuItems: function () {
              return [
                {
                  type: 'menuitem',
                  text: 'Full Name',
                  onAction: function () {
                    editor.insertContent('{{user.fullname}}');
                  }
                },
                {
                  type: 'menuitem',
                  text: 'First Name',
                  onAction: function () {
                    editor.insertContent('{{user.firstname}}');
                  }
                },
                 {
                  type: 'menuitem',
                  text: 'Last Name',
                  onAction: function () {
                    editor.insertContent('{{user.lastname}}');
                  }
                },
                 {
                  type: 'menuitem',
                  text: 'Email',
                  onAction: function () {
                    editor.insertContent('{{user.email}}');
                  }
                },
                 {
                  type: 'menuitem',
                  text: 'Phone',
                  onAction: function () {
                    editor.insertContent('{{user.phone}}');
                  }
                }
              ];
            }
          },
           {
            type: 'nestedmenuitem',
            text: 'Calender',
            getSubmenuItems: function () {
              return [
                {
                  type: 'menuitem',
                  text: 'Full Name',
                  onAction: function () {
                    editor.insertContent('{{user.fullname}}');
                  }
                }
              ];
            }
          },
          {
            type: 'togglemenuitem',
            text: 'Appointment',
            onAction: function () {
              toggleState = !toggleState;
              editor.insertContent('&nbsp;<em>You toggled a menuitem ' + (toggleState ? 'on' : 'off') + '</em>');
            },
            onSetup: function (api) {
              api.setActive(toggleState);
              return function() {};
            }
          }
        ];
        callback(items);
      }
    });

  },
      });

$(document).on('change','#quotation__change', function(){

      var val = $(this).val();
      var did = $(this).children('option:selected').attr('did');

          if(val !='')
          {
          $(this).parent().find('div#'+did).addClass('showQuo').siblings().removeClass('showQuo');
          //console.log($(this).parent().find('div#'+did).siblings().find('div').find('input').attr('disabled','disabled'));
          $(this).parent().parent().find('button').addClass('showQuo');
          }
          else
          {
            $(this).parent().find('div').siblings().removeClass('showQuo');
          }
});

$('select[name="fetch_boiler_type"]').on('change', function(){

      $('#selectParent').removeClass('home');
      var val = $(this).val();



        })

$(document).delegate('.add-more','click', function(){
  var idf = $(this).parent().parent().parent();
  var val = $(this).parent().parent().find('.boilerpart').val();
  var price = $(this).parent().parent().find('.df').val();
  var parentId = $(this).parent().parent().attr('sid');
   //console.log(parentId);
  var data = {

    boilerstype: val,
    price: price,
    mainId: parentId
            };
  console.log(data);
  var select = '';
  // $.ajax({

  //   url: '/crmnest/boilertype/add',
  //   type: 'POST',
  //   data: data,
  //   success: function(data)
  //   {

  //   }
  // })
  $(idf).append('<div class="col-md-12 twothree" sid='+parentId+'><input type="text" name="bo[]" class="form-control boilerpart" width="85%" placeholder="Boiler pack"><input class="df form-control" name="price[]" placeholder="price"><div class="mnp"><span class="add-more">+</span><span class="remove-more">-</span></div></div>');
})

$(document).delegate('.add-more-check-radio', 'click', function(){

	var val = $(this).data('val');
	var idf = $(this).parent().parent().parent();
	var bolts = $(this).parent().parent().find('.boilerpart').val();
  	var price = $(this).parent().parent().find('.df').val();

  		var data = {

  			bolt: bolts,
  			price: price,
  			select: val
  		}
  	$.ajax({

  		url: '/crmnest/quotation/post-choice',
  		method: 'POST',
  		data: data,
  		success: function(data)
  		{

  		}
  	});
	$(idf).append(`<div class="col-md-12 twothree">
		<input type="text" name="bo[]" class="form-control boilerpart" width="85%" placeholder="Boiler pack">
		<input class="df form-control" name="price[]" placeholder="price">
		<div class="mnp"><span class="add-more-check-radio" data-val="${val}">+</span><span class="remove-more">-</span></div></div>`);
});

$(document).delegate('.remove-more','click', function(){

  var idf = $(this).parent().parent().remove();

});

function oncgangeparentboiler(idd)
{

  var idf = (idd == 'undefined') ? 1 : idd;
    $('#selectParent').html('<div class="col-md-12"><div class="row main_row_idd"><div class="col-md-12 twothree" sid="'+idf+'"><input type="text" name="bo[]" class="form-control boilerpart" width="85%" placeholder="Boiler pack" ><input class="df form-control" name="price[]" placeholder="price"><div class="mnp"><span class="add-more">+</span><span class="remove-more">-</span></div></div></div></div>');
    $('#selectParent').addClass('home');
}

oncgangeparentboiler(1);

$('ul.nav.nav-tabs li:first-child a').addClass('active');

$(document).on('click','.fetch-boiler', function(){

    var idd = $(this).data('id');
    oncgangeparentboiler(idd);
})

$(document).on('click','#customRadio4', function(){

var val = $(this).data('ra');
 add_in_coice(val);
})

$(document).on('click','#customRadio5', function(){

	var val = $(this).data('ra');
	add_in_coice(val);
})



function exportTableToExcel(tableID, filename = ''){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

    // Specify file name
    filename = filename?filename+'.xls':'excel_data.xls';

    // Create download link element
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }
}


function add_in_coice(val)
{
	var data = `	<div class="col-md-12 twothree" sid="1">
	<input type="text" name="bo[]" class="form-control boilerpart" width="85%" placeholder="Boiler pack">
	<input class="df form-control" name="price[]" placeholder="price">
	<div class="mnp"><span class="add-more-check-radio" data-val="${val}">+</span><span class="remove-more">-</span></div></div>`;

	$('#choice-input').html(data);
}
