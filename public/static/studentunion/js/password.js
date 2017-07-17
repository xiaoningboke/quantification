
  $.extend($.fn.validatebox.defaults.rules, {
            equals: {
                validator: function(value,param){
                    return value == $(param[0]).val();
                },
                message: '两次密码不一致'
            }
        });
      function submitForm(){

          $('#self').form({
            url:'revisepassworld',
            onSubmit: function(){
                return $(this).form('validate');
                //return false;
            },
            success:function(data){
                $.messager.alert('Info', data, 'info');
              }
          });
          // submit the form
          $('#self').submit();

      }
      function clearForm(){
         $('#self').form('clear');
      }