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
                   url: "deletefraction",
                   data: {
                  ids: ids.join(',')
                            },
                    dataType: "json",
                      success : function (data) {

                          // if (data) {
                            // $('#tt').datagrid('loaded');
                            $('#tt').datagrid('load');
                            $('#tt').datagrid('unselectAll');
                            $.messager.show({
                              title : '提示',
                              msg : data + '个专业被删除成功！',
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
        url:"student",
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
        hidden:true
      },

    {
        field : 'classes_id',
        title : '班级ID',
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
          //type : 'validatebox',
                options : {
                  required : true,
                  },
                },
              },

        {
        field : 'nt_name',
        title : '姓名',
        width:150,
        sortable : true,
        editor : {
         // type : 'validatebox',
          options : {
            required : true,
          },
        },
      },

     {
      field : 'fo_time',
      title : '时间',
      sortable : true,
      width : 150,
      editor : {
        type : 'datebox',
        options : {
           required : true,
        },
      },
      },
           {
        field : 'fo_reason',
        title : '原因',
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
        field : 'fo_fraction',
        title : '分数',
        width:150,
        sortable : true,
        editor : {
          type : 'numberspinner',
          options : {
             required : true,
          },
        },
      },
       {
        field : 'fo_remarks',
        title : '备注',
        width:150,
        sortable : true,
        editor : {
          type : 'validatebox',
          options : {
          },
        },
      },
    ]],
        pagination:true,//分页功能
        pageSize:10,//每页显示条数
        pageList : [10, 20,60],//可选择的分页
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

                    url = "editstufraction";
                    info = '提交';

                  $.ajax({
                    type : 'POST',
                    url : url,
                    data : {
                        Id:rowData.Id,
                        fo_time:rowData.fo_time,
                        fo_reason:rowData.fo_reason,
                        fo_fraction:rowData.fo_fraction,
                        fo_remarks:rowData.fo_remarks,
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
                          msg : rowData.nt_name + '成绩被' + info + '成功！',
                        });
                        obj.editRow = undefined;
                      }
                    },
                  });

          /////////////////////////

          }


      });


    });
