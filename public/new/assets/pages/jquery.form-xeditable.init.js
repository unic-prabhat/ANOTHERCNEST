// /**
//  * Theme: Metrica - Responsive Bootstrap 4 Admin Dashboard
//  * Author: Mannatthemes
//  * X-Editable Js
//  */

 
// $(function () {

//   //modify buttons style
//   $.fn.editableform.buttons =
//       '<button type="submit" class="btn btn-success editable-submit btn-sm waves-effect waves-light"><i class="mdi mdi-check"></i></button>' +
//       '<button type="button" class="btn btn-danger editable-cancel btn-sm waves-effect waves-light"><i class="mdi mdi-close"></i></button>';


//   //inline


//   $('#inline-username').editable({
//       type: 'text',
//       pk: 1,
//       name: 'username',
//       title: 'Enter username',
//       mode: 'inline',
//       inputclass: 'form-control-sm'
//   });

//   $('#inline-firstname').editable({
//       validate: function (value) {
//           if ($.trim(value) == '') return 'This field is required';
//       },
//       mode: 'inline',
//       inputclass: 'form-control-sm'
//   });

//   $('#lead-owner').editable({
//       prepend: "not selected",
//       mode: 'inline',
//       inputclass: 'form-control-sm',
//       source: [
//           {value: 1, text: 'Male'},
//           {value: 2, text: 'Female'}
//       ],
//       display: function (value, sourceData) {
//           var colors = {"": "#98a6ad", 1: "#5fbeaa", 2: "#5d9cec"},
//               elem = $.grep(sourceData, function (o) {
//                   return o.value == value;
//               });

//           if (elem.length) {
//               $(this).text(elem[0].text).css("color", colors[value]);
//           } else {
//               $(this).empty();
//           }
//       }
//   });

//   $('#inline-status').editable({
//       mode: 'inline',
//       inputclass: 'form-control-sm'
//   });

//   $('#inline-group').editable({
//       showbuttons: false,
//       mode: 'inline',
//       inputclass: 'form-control-sm'
//   });

//   $('#inline-dob').editable({
//       mode: 'inline',
//       inputclass: 'form-control-sm'
//   });

//   $('#inline-comments').editable({
//       showbuttons: 'bottom',
//       mode: 'inline',
//       inputclass: 'form-control-sm'
//   });


// });

$(function(){
        
            $('#landlinenumber1').editable({
                mode:'inline',
           url: '/crmnest/lead/update',
           type: 'text',
           pk: 1,
           name: 'landlinenumber',
           title: 'Enter username',
            ajaxOptions:{
                            type:'get'
                           }
    });

    
      $('#lead-owner1').editable({
         mode: 'inline',
        source: '/crmnest/fetch/lead',
        success: function(response, newValue)
        {
            var pkid = $(this).attr('data-pk');
            var cuser = $(this).attr('cuser');
            $.ajax({
                
                url: '/crmnest/lead/update',
                data:{value:newValue,name:'user_id',pk:pkid,cuser:cuser},
                success: function(data)
                {
                    console.log(data);  
                }
            });
            
        },
         ajaxOptions:{
                            type:'get'
                           }
  
      });
    $('#mobilenumber1').editable({
        mode: 'inline',
        url: '/crmnest/lead/update',
        name: 'mobilenumber',
        type: 'text',
        title: 'Enter Mobile Number',
          ajaxOptions:{
                            type:'get'
                           }
        
    });
    
       $('#email1').editable({
        
                mode: 'inline',
        url: '/crmnest/lead/update',
        name: 'email',
        type: 'text',
        title: 'Enter Mobile Number',
          ajaxOptions:{
                            type:'get'
                           }
    });
    $('#leadsource1').editable({
        type: 'select',
		mode: 'inline',
        source: [
        
        
        {'value': 'ppc', 'text': 'ppc'},
        {'value': 'social media', 'text': 'Social Media'},
        {'value': 'Organic Boiler', 'text': 'Organic Boiler'},
        {'value': 'guide', 'text': 'Guide'},
        {'value': 'existing customer', 'text': 'Existing Customer'},
        {'value': 'price engine', 'text': 'Price Engine'},
        {'value': 'rpd', 'text': 'RPD'},
            
            ],
            success: function (response, newValue) {
                var pkid = $(this).attr('data-pk');
                $.ajax({
                    
                         url: '/crmnest/lead/update',
                data:{value:newValue,name:'leadsource',pk:pkid},
                success: function(data)
                {
                    console.log(data);  
                }
                });
           
            },
         ajaxOptions:{
                            type:'get'
                           }
    });
    
    //   $('#address').editable({
    //     value: {
    //         city: "Moscow", 
    //         street: "Lenina", 
    //         building: "12"
    //     },
    //     validate: function(value) {
    //         if(value.city == '') return 'city is required!'; 
    //     },
    //     display: function(value) {
    //         if(!value) {
    //             $(this).empty();
    //             return; 
    //         }
    //         var html = '<b>' + $('<div>').text(value.city).html() + '</b>, ' + $('<div>').text(value.street).html() + ' st., bld. ' + $('<div>').text(value.building).html();
    //         $(this).html(html); 
    //     }         
    // });  
 
    $('#address1').on('click',function(e){
        var leadid = $(this).attr('data-pk');
        e.preventDefault();
        var htm = '';
        var text = $(this).text();
        var con_array = text.split(',');
        
        var myarr = [];
        myarr['address'] = con_array[0];
        myarr['town'] = con_array[1];
        myarr['country'] = con_array[2];
        myarr['postcode'] = con_array[3];
        
     htm = `<div class="address_main"><div class="address_child float-left"><form id="get_form"><input type="text" name="address" value="${myarr['address']}"/>
     <input type="text" name="town" value="${myarr['town']}"/>
     <input type="text" name="country" value="${myarr['country']}"/>
     <input type="hidden" name="lead_id" value="${leadid}"/>
     <input type="text" name="postcode" value="${myarr['postcode']}"/></div><div class="float-right"><button type="submit" class="btn btn-primary btn-sm editable-submit" id="saveAddress">
     <i class="fa fa-check" aria-hidden="true"></i></button><button type="button" class="btn btn-default btn-sm editable-cancel" id="savecloseform"><i class="fa fa-times" aria-hidden="true"></i></button></form></div></div>`;
        
        $('.show_address').show();
        $('.show_address').html(htm);
        
    });
    
    $(document).delegate('#saveAddress','click',function(){
        var onestring = '';
            var pa = $(this).parent().parent();
            var getid = pa.find('#get_form');
            var valu = getid.find('input:not("input[type=hidden]")').each(function(index, value){
                
                    var newval = value.value;
                    
                    onestring += newval + ',';
                    
                
            });
            var strnew = onestring.substring(0, onestring.length-1);
            $('#address1').html(strnew);
            $(this).parent().parent().parent().hide();
            
     var myform = document.getElementById("get_form");
    var fd = new FormData(myform );
      $.ajaxSetup({
        
        headers: {
            
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url:'/crmnest/updateAddress',
        data: fd,
        cache: false,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (dataofconfirm) {
            // do something with the result
        }
    });
    })
    $(document).delegate('#savecloseform','click',function(){
        $(this).parent().parent().parent().hide();
    })
});