      function submitForm(){
        //使普通表单成为ajax提交方式的表单。
       $('#self').form({
            url:'revisemessage',
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

          // submit the form
        }
      function clearForm(){
         $('#self').form('clear');
      }