

 //选择
  function select(){
  $("#save,#redo").toggle();//显示和隐藏
  if ($('#edit').text() == '选择') {
    $('#edit').text('编辑');
  }

   $('#cd').empty();
    $('#cd').append('<select id="cc" class="easyui-combobox" name="dept" style="width:150px;"><option id="selctcc">------</option></select>');

    $('#cc').combobox({
    url:'comBobox?classid='+$('#classid').val(),
    valueField:'value',
    textField:'text',
    editable:false,
     onSelect :function(record){
$("#save,#redo").show();//显示
     } //在用户选择列表项的时候触发。
    });
$('#cc').combobox('reload');//重新载入
  }

  //修改
  function edit(){

     $.ajax({
                   type: "post",
                   url: "updateComm",
                   data: {
                  student_id: $("#cc").combobox('getValue'),
                 classid:$('#classid').val(),
                            },
                    dataType: "json",
                      success : function (data) {
                         $("#save,#redo").hide();//隐藏
                          if (data.code == '200') {
                            $.messager.show({
                              title : '提示',
                              msg : '量化委员修改成功！',
                            });
                           }
                      },
                  });


  }


  //取消编辑
  function redo(){
  $("#save,#redo").hide();//显示和隐藏

  }



$(function(){





  $('#cc').hide();

//////////////////////////////////////////////////ajax预加载
                   $.ajax({
                   type: "post",
                   url: 'commDetails',
                   data: {
                 classid: $('#classid').val()
                            },
                    dataType: "json",
                      success : function (data) {
                              if (data.code == '200') {
                               var data = data.data;
                              //属性表格
                              $('#pg').propertygrid({
                            showGroup: true,
                            autoRowHeight:false,
                            // height:500,
                            scrollbarSize: 0,
                            columns:[[
                                {
                                  field:'name',title:'属性',width:150,resizable:true,disabled:true
                                },
                                {
                                  field:'value',title:'取值',width:150,resizable:true,disabled:true
                                }
                                ]]
                          });
                            $('#pg').datagrid('loadData',{total:0,rows:[]});//清空数据

            var rows = [
                {"name":"学号","value":data.nt_number,"group":"量化委员信息","editor":"text"},
                {"name":"姓名","value":data.nt_name,"group":"量化委员信息","editor":"text"},
                {"name":"性别","value":data.nt_sex,"group":"量化委员信息","editor":"text"},
                {"name":"身份证号码","value":data.nt_idnumber,"group":"量化委员信息","editor":"text"},
                {"name":"备注","value":data.nt_remarks,"group":"量化委员信息","editor":"text"}
                ];

                            $('#pg').propertygrid('loadData', rows);
                            //添加一个隐藏id的隐藏域
                            $('#committeeid').val(data.Id);
                      }

                    },

                  });
//////////////////////////////////////////////////ajax预加载



});


