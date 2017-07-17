   function details(){//详情函数
////////////////先加载标签
$('#win').empty();

$('#win').append('<div style="margin-bottom:10px;padding:5px;" id="tb"><a href="#" class="easyui-linkbutton"  onclick="pobj.add();" id="padd">添加</a><a href="#" class="easyui-linkbutton"  onclick="pobj.edit()" id="pedit">修改</a><a href="#" class="easyui-linkbutton"  onclick="pobj.remove()" id="premove">删除</a><a href="#" class="easyui-linkbutton"  onclick="pobj.save()" style="display:none;" id="psave">保存</a><a href="#" class="easyui-linkbutton"  onclick="pobj.redo()" style="display:none;" id="predo">取消编辑</a></div><table id="ptd" class="easyui-datagrid" style="width:980px;"></table>');

$('#padd').linkbutton({
    iconCls: 'icon-add',
    plain:true
});

$('#pedit').linkbutton({
     iconCls:'icon-edit',
     plain:true
});
$('#premove').linkbutton({
    iconCls:'icon-remove',
    plain:true
});
$('#psave').linkbutton({
    iconCls:'icon-save',
    plain:true
});
$('#predo').linkbutton({
    iconCls:'icon-redo',
    plain:true
});
////////////////先加载标签
var row = $('#tt').datagrid('getSelected');

                $('#ptd').datagrid({
                                            width:680,
                                            title:"个人量化" ,
                                            iconCls:'icon-save',
                                            //自适应
                                            striped:true,
                                            nowrap:true,
                                             url: "studentDetails?studentid="+row.Id,//方法地址
                                            // fit:true,自适应不太好看，可以试着开启
                                            rownumbers:true,//显示行号
                                            columns : [[
                                              {
                                                field : 'Id',
                                                title : '编号',
                                                sortable : true,
                                                width : 100,
                                                checkbox : true,
                                                hidden:true,
                                              }, {
                                                field : 'student_id',
                                                title : '学生id',
                                                sortable : true,
                                                width : 100,
                                                checkbox : true,
                                                hidden:true,
                                              },
                                            {field : 'fo_time',
                                            title : '时间',
                                            sortable : true,
                                            width : 150,
                                            // formatter:function(date){
                                            //         var y = date.getFullYear();
                                            //         var m = date.getMonth()+1;
                                            //         var d = date.getDate();
                                            //         return y+'年'+m+'月'+d+'日';
                                            //       },
                                            editor : {
                                              type : 'datebox',
                                              options : {
                                                required : true,
                                                  },
                                                },
                                              },
                                            {field : 'fo_fraction',
                                            title : '分数',
                                            sortable : true,
                                            width : 150,
                                            editor : {
                                              type : 'validatebox',
                                              options : {
                                                required : true,
                                                  },
                                                },
                                              },
                                            {field : 'fo_reason',
                                            title : '原因',
                                            sortable : true,
                                            width : 150,
                                            editor : {
                                            type : 'validatebox',
                                            options : {
                                              required : true,
                                                },
                                              },
                                            },
                                            {field : 'fo_remarks',
                                            title : '备注',
                                            sortable : true,
                                            width : 150,
                                            editor : {
                                              type : 'validatebox',
                                              options : {
                                                required : true,
                                                  },
                                                },
                                              }
                                        ]],
                                         pagination:true,//分页功能
                                         pageSize:10,//每页显示条数
                                         pageList : [10, 15, 20],//可选择的分页
                                         pageNumber : 1,//默认初始化页码
                                         pagePosition : 'bottom',//分页的位置//双击是修改
                                         onAfterEdit:function(rowIndex,rowData,changes){

                      $('#save,#redo').hide();
                      var inserted = $('#ptd').datagrid('getChanges', 'inserted');
                      var updated = $('#ptd').datagrid('getChanges', 'updated');


                      var url = info =  '';


                      //新增用户
                      if (inserted.length > 0) {
                        url = "addQuan";
                        info = '新增';
                      }

                  //修改用户
                  if (updated.length > 0) {
                    url = "updateQuan";
                    info = '修改';
                  }

                  $.ajax({
                    type : 'POST',
                    url : url,
                    data : {
                        Id:rowData.Id,
                        studentid:row.Id,
                        time:rowData.fo_time,
                        fraction:rowData.fo_fraction,
                        reason:rowData.fo_reason,
                        remarks:rowData.fo_remarks,

                    },
                    beforeSend : function () {
                      $('#ptd').datagrid('loading');
                    },
                    success : function (data) {
                      if (data) {
                        $('#ptd').datagrid('loaded');
                        $('#ptd').datagrid('load');
                        $('#ptd').datagrid('unselectAll');
                        $.messager.show({
                          title : '提示',
                          msg : row.Id + '量化被' + info + '成功！',
                        });
                        pobj.editRow = undefined;
                      }
                    },
                  });

          /////////////////////////

          }
                                          });

////////////////加载表格
     $('#win').window('open');



}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////





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
                   url: "deleteQuan",
                   data: {
                  ids: ids.join(',')
                            },
                    dataType: "json",
                      success : function (data) {

                            $('#ptd').datagrid('load');
                            $('#ptd').datagrid('unselectAll');
                            $('#ptd').datagrid('deleteRow');

                        $('#win').panel('refresh');
                            $.messager.show({
                              title : '提示',
                              msg : '量化信息被删除成功！',
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


};

