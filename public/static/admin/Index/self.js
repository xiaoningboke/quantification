 if($('#sex').val()==1){
    $('#woman').attr("checked",true);
 }else{
    $('#man').attr("checked",true);

 }

      function submitForm(){
        //使普通表单成为ajax提交方式的表单。
       $('#self').form({
            url:$('#self').action,
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