  $(document).ready(function(){
$('#datetimepicker').datetimepicker({
  format:'Y-m-d g:i:s',
});
  $('select[name="boiler_id"]').on('change', function(){ 
    var output = '';
    var val = $(this).val();
    $.ajax({
      url: '/crmnest/getallboilerchildren/'+val,
      success: function(data)
      {


          output ='<div class="col-md-4">';
              if(val == 1)
              {
                  output +='<label>First Regular Boiler Choice*</label>';
              }
               else if(val == 2)
              {
                output +='<label>First System Boiler Choice*</label>';
              }
                else if(val == 3)
              {
                output +='<label>First Combi Boiler Choice*</label>';
              }
                 else if(val == 4)
              {
                output +='<label>First Combi Boiler Choice*</label>';
              }
          output +='<select class="form-control" name="first_regular_boiler_choice" id="first_regular_boiler_choice" onchange="return firstregularboiler(this);">';
          output +='<option>Select Boiler</option>';
          $.each(data, function(index, value){

                  console.log(value.boilertype);

                  output +='<option value="'+value.id+'">'+value.boilertype+'</option>';
          });
          output +='</select></div>';

          output +='<div class="col-md-4">';

             if(val == 1)
              {
                  output +='<label>Second Regular Boiler Choice*</label>';
              }
              else if(val == 2)
              {
                output +='<label>Second System Boiler Choice*</label>';
              }
                else if(val == 3)
              {
                output +='<label>Second Combi Boiler Choice*</label>';
              }
                    else if(val == 4)
              {
                output +='<label>Second Combi Boiler Choice*</label>';
              }
          output +='<select class="form-control" name="second_regular_boiler_choice" id="second_regular_boiler_choice" onchange="return secondregularboiler(this);">';
          output +='<option>Select Boiler</option>';
          $.each(data, function(index, value){

                  console.log(value.boilertype);

                  output +='<option value="'+value.id+'">'+value.boilertype+'</option>';
          });
          output +='</select></div>';


          output +='<div class="col-md-4">'
               if(val == 1)
              {
                  output +='<label>Third Regular Boiler Choice*</label>';
              }
               if(val == 2)
              {
                  output +='<label>Third System Boiler Choice*</label>';
              }
                 if(val == 3)
              {
                  output +='<label>Third Combi Boiler Choice*</label>';
              }
                  if(val == 4)
              {
                  output +='<label>Third Combi Boiler Choice*</label>';
              }
          output +='<select class="form-control" name="third_regular_boiler_choice" id="third_regular_boiler_choice" onchange="return thirdregularboiler(this);" >';
          output +='<option>Select Boiler</option>';
          $.each(data, function(index, value){

                  console.log(value.boilertype);

                  output +='<option value="'+value.id+'">'+value.boilertype+'</option>';
          });
          output +='</select></div>';




          $('#getboiler').html(output);
      }
    })

    $('#choice_get_control').removeClass('boilercontrol');
  })

      $('select.gfield_select').on('change',function(){

          var val = $(this).val();
          if(val == 'Combi' && val !='')
          {
            $('#combi').fadeIn('slow',function(){

              $(this).removeClass('show_next');
            })
          }
          else
          {
             $('#combi').fadeOut('slow',function(){

              $(this).removeClass('show_next');
            })
            $('#combi').addClass('show_next');
          }

          if((val == 'Conventional' || val == 'System') && val !='')
          {
              $('#conventional').fadeIn('slow',function(){

              $(this).removeClass('show_next');
            })
          }
          else
          {
            $('#conventional').fadeOut('slow',function(){

              $(this).addClass('show_next');
            })

          }
      })
$('select[name="materials_check"]').on('change',function(){

    var vl = $(this).val();

    if(vl != '')
    {
      $('#materials_check').fadeIn('slow',function(){
            $('#materials_check').removeClass('show_next');
      })
    }
    else
    {
        $('#materials_check').fadeOut('slow',function(){
            $('#materials_check').addClass('show_next');
      })
    }
});

$('select[name="condesnate"]').on('change',function(){
    var vl = $(this).val();
if(vl != '')
{
  $('#condesnate').fadeIn('slow',function(){
    $('#condesnate').removeClass('show_next');
  })
}
else
{
      $('#condesnate').fadeOut('slow',function(){
    $('#condesnate').addClass('show_next');
  })
}
})
      $('select.alter').on('change',function(){

          var vl = $(this).val();

          if(vl !='' && vl !='No')
          {
            $('#altering').fadeIn('slow', function(){

              $('#altering').removeClass('show_next');
            })
          }
          else
          {
             $('#altering').fadeOut('slow', function(){

              $('#altering').addClass('show_next');
            })
          }
      });

      $('select[name="supply_change"]').on('change',function(){
        var vll = $(this).val();

        if(vll != 'Current gas supply deemed satisfactory')
        {
          $('#supplylength').fadeIn('slow', function(){

              $('#supplylength').removeClass('show_next');

          });
        }
        else
        {
               $('#supplylength').fadeOut('slow', function(){

              $('#supplylength').addClass('show_next');

          });
        }
      });

$('select[name="radiator_requirement"]').on('change',function(){

  var valo = $(this).val();
  //alert(valo);
  if(valo == 'Radiators Required')
  {
    $('#radiators_required').fadeIn('slow',function(){

      $('#radiators_required').removeClass('show_next');
    });
  }
  else

  {
        $('#radiators_required').fadeOut('slow',function(){

      $('#radiators_required').addClass('show_next');
    });
  }

   if(valo == "TRV's / Lockshields Required")
  {
    $('#lockshieldsrequired').fadeIn('slow',function(){

      $('#lockshieldsrequired').removeClass('show_next');
    });
  }
  else

  {
        $('#lockshieldsrequired').fadeOut('slow',function(){

      $('#lockshieldsrequired').addClass('show_next');
    });
  }
})
  });

$(document).delegate('.radiator_click','click',function(){
  if($(this).parent().find('#remove-graditor').length == 0)
{
    $(this).parent().append('<button class="btn btn-danger btn-sm remove_child" style="margin-top: 26px;" id="remove-graditor"><i class="fa fa-minus"></i></button>');
}

      var output = '';

      output = `<div class="parents">
                        <div class="child_team">
                        <select class="form-control">
                          <option value="Bedroom 1">Bedroom 1</option>
                          <option value="Bedroom 2">Bedroom 2</option>
                          <option value="Bedroom 3">Bedroom 3</option>
                          <option value="Bedroom 4">Bedroom 4</option>
                          <option value="Bedroom 5">Bedroom 5</option>
                          <option value="Dining Room">Dining Room</option>
                          <option value="Lounge">Lounge</option>
                          <option value="Downstairs Hallway">Downstairs Hallway</option>
                          <option value="Downstairs WC">Downstairs WC</option>
                          <option value="Kitchen">Kitchen</option>
                          <option value="Conservatory">Conservatory</option>
                          <option value="Landing">Landing</option>
                          <option value="Bathroom 1">Bathroom 1</option>
                          <option value="Bathroom 2">Bathroom 2</option>
                          <option value="Ensuite 1">Ensuite 1</option>
                          <option value="Ensuite 2">Ensuite 2</option>
                          <option value="Ensuite 3">Ensuite 3</option>
                          <option value="Airing Cupboard">Airing Cupboard</option>
                        </select>
                      </div>
                      <div class="child_team">
                        <select class="form-control">
                          <option value="300">300</option>
                          <option value="350">350</option>
                          <option value="400">400</option>
                          <option value="450">450</option>
                          <option value="500">500</option>
                          <option value="550">550</option>
                          <option value="600">600</option>
                          <option value="650">650</option><option value="700">700</option>
                        </select>
                      </div>
                      <div class="child_team">
                        <select class="form-control">
                            <option value="400">400</option>
                            <option value="500">500</option>
                            <option value="600">600</option>
                            <option value="700">700</option>
                            <option value="800">800</option>
                            <option value="900">900</option>
                            <option value="1000">1000</option>
                            <option value="1100">1100</option>
                            <option value="1200">1200</option>
                            <option value="1300">1300</option>
                            <option value="1400">1400</option>
                            <option value="1500">1500</option>
                            <option value="1600">1600</option>
                            <option value="1700">1700</option>
                            <option value="1800">1800</option>
                            <option value="1900">1900</option>
                            <option value="2000">2000</option>
                        </select>
                      </div>
                      <div class="child_team">
                        <select class="form-control">
                            <option value="P+">P+</option>
                            <option value="K1">K1</option>
                            <option value="K2">K2</option>
                            <option value="K3">K3</option>
                        </select>
                      </div>
                      <button class="btn btn-info btn-sm radiator_click" onclick="addMore()"><i class="fa fa-plus"></i></button>
                      <button class="btn btn-danger btn-sm remove_child" style="margin-top:0px;" id="remove-graditor"><i class="fa fa-minus"></i></button>
                      </div>`;

                      $('#radiators_required').append(output);
})
  $(document).delegate('.ch_more_click','click',function(){
if($(this).parent().find('#remove-fil').length == 0)
{
    $(this).parent().append('<button class="btn btn-danger btn-sm remove_child" style="margin-top: 16px;" id="remove-fil" type="button"><i class="fa fa-minus"></i></button>');
}


 var output = '';

    output = `<div class="row parent col-lg-12">
                        <div class="child">
                              <div class="form-group">
                            <input type="text" class="form-control"/>
                                </div>
                        </div>
                          <div class="child">
                              <div class="form-group">
                            <input type="text" class="form-control"/>
                                </div>
                        </div>
                          <div class="child">
                              <div class="form-group">
                            <input type="text" class="form-control"/>
                                </div>
                        </div>
                        <button class="btn btn-info btn-sm ch_more_click" style="margin-top: -10px;" onclick="addMore()" type="button"><i class="fa fa-plus"></i></button>
                        <button class="btn btn-danger btn-sm remove_child" style="margin-top: -10px;" id="remove-fil" type="button"><i class="fa fa-minus"></i></button>
                   </div>`;

                   $('#mainpar').append(output);
  })

$(document).delegate('.remove_child','click',function(){
  if($(this).parent().parent().find('.remove_child').length > 1)
  {
  $(this).parent().remove();
  }
});


  function second_show(data)
  {
    console.log(data);
      var tt = $(data).attr('name');
      if(tt == 'boiler_choice-children_3')
      {
        $('#choice_get_control').toggleClass('show_next');
      }
  }

  // function all_check_bolts()
  // {
  //   $('#bolts').toggleClass('show_next');
  // }

  // function mycFun()
  // {
  //   $('#choice_get_control').addClass('boilercontrol');
  // }


  function fetch_boilers_type_by_id(idm)
  {
    let idi = idm == 'undefined' ? 1 : idm;

    console.log(idi);
  }

  fetch_boilers_type_by_id(idm);
