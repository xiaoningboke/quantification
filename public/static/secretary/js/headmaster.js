$(function(){
obj ={
  editRow : undefined,//设置变量默认值

//增加
  add: function(){
      $('#save,#redo').show();//显示出来-------
      if (this.editRow == undefined) {
       this.editRow = 0;//设置在下面会失去

      $('#tt').datagrid('insertRow', {
            index : 0,
            row:{

            }//我也不知道为啥要为空，反正写上就是正确的
          });
         //将第一行设置为可编辑状态
        $('#tt').datagrid('beginEdit', 0);
          }
      },

  //修改
  edit:function(){
    var rows = $('#tt').datagrid('getSelections');
    if (rows.length == 1) {
              if (this.editRow !== undefined) {
            $('#tt').datagrid('endEdit',this.editRow);//双击修改此行
          }
          if (this.editRow == undefined) {
            var index = $('#tt').datagrid('getRowIndex',rows[0]);
            $('#save,#redo').show();
            $('#tt').datagrid('beginEdit',index);//双击修改此行
            this.editRow = index;
          $('#tt').datagrid('unselectRow', index);
        }
      } else {
        $.messager.alert('警告', '修改必须或只能选择一行！', 'warning');
         $('#tt').datagrid('rejectChanges');//回滚状态
    }
  },

    //选择删除
    remove:function(){
      var rows = $('#tt').datagrid('getSelections');
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
                   url: "deleteheadmaster",
                   data: {
                  ids: ids.join(',')
                            },
                    dataType: "json",
                      success : function (data) {

                            $('#tt').datagrid('load');
                            $('#tt').datagrid('unselectAll');
                            $.messager.show({
                              title : '提示',
                              msg : data + '个班主任被删除成功！',
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
      $('#tt').datagrid('endEdit',this.editRow);
      //保存之后执行
        $('#save,#redo').hide();
          this.editRow = undefined;
        },
    //详情
    details:function(){
        var rows = $('#tt').datagrid('getSelections');
    if (rows.length > 1) {
        $.messager.alert('警告', '必须或只能选择一行！', 'warning');
         $('#tt').datagrid('rejectChanges');//回滚状态
    }else{
     addTable();

    }  
    },
    //取消
    redo:function(){
      $('#save,#redo').hide();
        this.editRow = undefined;
        $('#tt').datagrid('rejectChanges');//回滚状态
    },
};
      $('#tt').datagrid({
        width:980,
        //height:不设让它自适应
        title:"班级人员" ,
        url:"headmastermessage",
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
        hidden : true,
      },
      {
        field : 'ad_number',
        title : '工号',
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
        field : 'ad_name',
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
        field : 'ad_sex',
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
                        value: 0,
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
        field : 'ad_email',
        title : '邮箱',
        width:150,
        sortable : true,
        editor : {
          type : 'validatebox',
          options : {
            validType:'email',
            required : true,
          },
        },
      },  
       {
        field : 'ad_remarks',
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
        pagination:true,//分页功能
        pageSize:10,//每页显示条数
        pageList : [10, 15, 20],//可选择的分页
        pageNumber : 1,//默认初始化页码
        pagePosition : 'bottom',//分页的位置//双击是修改
        onDblClickRow:function(rowIndex,rowData){

           if (obj.editRow != undefined) {
        $('#tt').datagrid('endEdit', obj.editRow);
          }

          if (obj.editRow == undefined) {
               obj.editRow = rowIndex;
            $('#save,#redo').show();
            $('#tt').datagrid('beginEdit', rowIndex);

          }
        },
        onAfterEdit:function(rowIndex,rowData,changes){
                      $('#save,#redo').hide();
                      var inserted = $('#tt').datagrid('getChanges', 'inserted');
                      var updated = $('#tt').datagrid('getChanges', 'updated');

                      var url = info =  '';

                      //新增用户
                      if (inserted.length > 0) {
                        url = "addheadmaster";
                        info = '新增';
                      }

                  //修改用户
                  if (updated.length > 0) {
                    url = "editheadmaster";
                    info = '修改';
                  }

                  $.ajax({
                    type : 'POST',
                    url : url,
                    data : {
                        Id:rowData.Id,
                        number:rowData.ad_number,
                        name:rowData.ad_name,
                        sex:rowData.ad_sex,
                        email:rowData.ad_email,
                        remarks:rowData.ad_remarks,

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
                          msg : rowData.ad_name + '班主任被' + info + '成功！',
                        });
                        obj.editRow = undefined;
                      }
                    },
                  });

          /////////////////////////

          }


      });


    });



