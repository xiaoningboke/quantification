function addTable(){
$('#win').empty();

$('#win').append('<div style="margin-bottom:10px;padding:5px;" id="ptb"><a href="#" class="easyui-linkbutton" onclick="pobj.add();" id="padd">添加</a><a href="#" class="easyui-linkbutton" onclick="pobj.edit();"id="pedit">修改</a><a href="#" class="easyui-linkbutton" onclick="pobj.remove()"id="pdel">删除</a><a href="#" class="easyui-linkbutton" onclick="pobj.save()"style="display: none;" id="psave">保存</a><a href="#" class="easyui-linkbutton" onclick="pobj.redo()"   style="display: none;" id="predo">取消编辑</a></div><table id="ptd" class="easyui-datagrid" style="width:980px;"></table>');

$('#padd').linkbutton({    
    iconCls: 'icon-add',
   plain:true
});  
$('#pedit').linkbutton({    
     iconCls:'icon-edit',
     plain:true
});  
$('#pdel').linkbutton({    
    iconCls:'icon-remove',
    plain:true  
});  
$('#psave').linkbutton({    
    iconCls:' icon-save',
    plain:true  
}); 
$('#predo').linkbutton({    
    iconCls:'icon-redo',
    plain:true  
}); 
////////////////////////////
          var row = $('#tt').datagrid('getSelected');
         // console.log(row);

                  $('#win').window({    
                  width:900,    
                  height:400,    
                  modal:true   
              });  

              $('#win').window('open');  
            $.ajax({
                   type: "post",
                   url: "student",
                   data: {
                    classid: row.Id
                        },
                      dataType: "json",
                      success : function (data) {
//////////////////////////////////////分隔符
     
      $('#ptd').datagrid({
        width:980,
        //height:不设让它自适应
        title:"班级人员" ,
        //url:"classmessage",
        iconCls:'icon-save',
        //自适应
        striped:true,
        nowrap:true,
        // fit:true,自适应不太好看，可以试着开启
        rownumbers:true,//显示行号
        columns : [[
        {
        field : 'id',
        title : '编号',
        sortable : true,
        width : 100,
        checkbox : true,
      },
      {
        field : 'classes_id',
        title : '班级id',
        width:150,
        sortable : true,
        hidden:true
      },
      {
        field : 'nt_number',
        title : '学号',
        width:150,
        sortable : true,
        editor : {
          type : 'validatebox',
              
        },
      },
     {
        field : 'nt_name',
        title : '姓名',
        width:150,
        sortable : true,
        editor : {
        type : 'validatebox',
        options : {
            required : true,
          },
        },
      },
       {
        field : 'nt_sex',
        title : '性别',
        width:150,
        sortable : true,
         formatter : function(value) {
                    if (value==0) {
                        return "男";
                    }else if(value==1){
                        return "女";
                    }else{
                        return " ";
                    }
                },
                  editor : {
                type : 'combobox',
                options : {
                    valueField:'value',
                    textField:'text',
                    editable:false,
                    data:[{
                        value: 1,
                        text: '男'
                    },{
                        value: 1,
                        text: '女'
                    }],
                    panelHeight:50
                },
            },
      },
    {
        field : 'nt_idnumber',
        title : '身份证',
        width:150,
        sortable : true,
        editor : {
          type : 'validatebox',
                 options : {
                    
                },
        },
      },
        {
        field : 'nt_email',
        title : '邮箱',
        width:150,
        sortable : true,
        editor : {
          type : 'validatebox',
                 options : {
                    
                },
        },
      },
       {
        field : 'nt_remarks',
        title : '备注',
        width:150,
        sortable : true,
        editor : {
          type : 'validatebox',
          options : {
            // required : true,
          },
        },
      },
    ]],

        onDblClickRow:function(rowIndex,rowData){

           if (pobj.editRow != undefined) {
        $('#ptd').datagrid('endEdit', pobj.editRow);
          }

          if (pobj.editRow == undefined) {
               pobj.editRow = rowIndex;
            $('#psave,#predo').show();
            $('#ptd').datagrid('beginEdit', rowIndex);

          }
        },
        onAfterEdit:function(rowIndex,rowData,changes){
                      $('#save,#redo').hide();
                      var inserted = $('#ptd').datagrid('getChanges', 'inserted');
                      var updated = $('#ptd').datagrid('getChanges', 'updated');

                      var url = info =  '';

                      //新增用户
                      if (inserted.length > 0) {
                        url = "addstudent";
                        info = '新增';
                      }

                  //修改用户
                  if (updated.length > 0) {
                    url = "editstudent";
                    info = '修改';
                  }

                  $.ajax({
                    type : 'POST',
                    url : url,
                    data : {
                         Id:rowData.Id,
                         class_Id:row.Id,
                        nt_number:rowData.nt_number,
                        nt_name:rowData.nt_name,
                        nt_sex:rowData.nt_sex,
                        nt_idnumber:rowData.nt_idnumber,
                        nt_email:rowData.nt_email,
                        nt_remarks:rowData.nt_remarks,

                    },
                    beforeSend : function () {
                      $('#tt').datagrid('loading');
                    },
                    success : function (data) {
                      if (data) {
                        $('#tt').datagrid('loaded');
                        $('#tt').datagrid('load');
                        $('#tt').datagrid('unselectAll');
                        $.messager.show({
                          title : '提示',
                          msg : rowData.nt_name + '学生被' + info + '成功！',
                        });
                        pobj.editRow = undefined;
                      }
                    },
                  });

          /////////////////////////

          }


      });




//////////////////////////////////////分隔符



                        if (data.code == '200') {
                          var data = data.data;
                          var arraydata = data.data;
                        
                           $('#ptd').datagrid("loadData",arraydata);//将数据绑定到DataGrid中  

 
                        }
                        
                            }
                          });




pobj ={
  editRow : undefined,//设置变量默认值

//增加
  add: function(){
      $('#psave,#predo').show();//显示出来-------
      if (this.editRow == undefined) {
       this.editRow = 0;//设置在下面会失去

      $('#ptd').datagrid('insertRow', {
            index : 0,
            row:{

            }//我也不知道为啥要为空，反正写上就是正确的
          });
         //将第一行设置为可编辑状态
        $('#ptd').datagrid('beginEdit', 0);
          }
      },

  //修改
  edit:function(){
    var rows = $('#ptd').datagrid('getSelections');
    if (rows.length == 1) {
              if (this.editRow !== undefined) {
            $('#ptd').datagrid('endEdit',this.editRow);//双击修改此行
          }
          if (this.editRow == undefined) {
            var index = $('#ptd').datagrid('getRowIndex',rows[0]);
            $('#psave,#predo').show();
            $('#ptd').datagrid('beginEdit',index);//双击修改此行
            this.editRow = index;
          $('#ptd').datagrid('unselectRow', index);
        }
      } else {
        $.messager.alert('警告', '修改必须或只能选择一行！', 'warning');
         $('#ptd').datagrid('rejectChanges');//回滚状态
    }
  },

    //选择删除
    remove:function(){
      var rows = $('#ptd').datagrid('getSelections');
      if (rows.length > 0) {
        $.messager.confirm('确定操作','您正在删除所选记录吗?',function(flag){
              if (flag) {
                    var ids = [];
                    for(var i = 0; i < rows.length;i++){
                      ids.push(rows[i].Id);
                }
////////////////////////////////ajax请求
               $.ajax({
                   type: "post",
                   url: "deletestudent",
                   data: {
                  ids: ids.join(',')
                            },
                    dataType: "json",
                      success : function (data) {

                            $('#ptd').datagrid('load');
                            $('#ptd').datagrid('unselectAll');
                            $.messager.show({
                              title : '提示',
                              msg : data + '个学生被删除成功！',
                            });
                          // }
                      },
                  });
///////////////////////////////ajax请求

              }
          });
        }else{
        $.messager.alert('提示','请选择要删除的记录!','info');
      }
    },
    //保存
    save:function(){
      //结束编辑
      $('#ptd').datagrid('endEdit',this.editRow);
      //保存之后执行
        $('#psave,#predo').hide();
          this.editRow = undefined;
        },

    //详情
    details:function(){
        var rows = $('#ptd').datagrid('getSelections');
    if (rows.length > 1) {
        $.messager.alert('警告', '修改必须或只能选择一行！', 'warning');
         $('#ptd').datagrid('rejectChanges');//回滚状态
    }else{
      addTable();
    }

      
    },
    //取消
    redo:function(){
      $('#psave,#predo').hide();
        this.editRow = undefined;
        $('#ptd').datagrid('rejectChanges');//回滚状态
    },
         onAfterEdit:function(rowIndex,rowData,changes){
                      $('#save,#redo').hide();
                      var inserted = $('#tt').datagrid('getChanges', 'inserted');
                      var updated = $('#tt').datagrid('getChanges', 'updated');

                      var url = info =  '';

                      //新增用户
                      if (inserted.length > 0) {
                        url = "addclasses";
                        info = '新增';
                      }

                  //修改用户
                  if (updated.length > 0) {
                    url = "editclasses";
                    info = '修改';
                  }

                  $.ajax({
                    type : 'POST',
                    url : url,
                    data : {
                         Id:rowData.Id,
                        cl_grade:rowData.cl_grade,
                        cl_major:rowData.cl_major,
                        cl_classes:rowData.cl_classes,
                        cl_headmaster:rowData.cl_headmaster,
                        cl_remarks:rowData.cl_remarks,
                    },
                    beforeSend : function () {
                      $('#tt').datagrid('loading');
                    },
                    success : function (data) {
                      if (data) {
                        $('#tt').datagrid('load');
                        $('#tt').datagrid('unselectAll');
                        $.messager.show({
                          title : '提示',
                          msg : rowData.cl_grade + '专业被' + info + '成功！',
                        });
                        obj.editRow = undefined;
                      }
                    },
                  });

          /////////////////////////

          }

};


}