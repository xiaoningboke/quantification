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
                   url: "deleteclasses",
                   data: {
                  ids: ids.join(',')
                            },
                    dataType: "json",
                      success : function (data) {

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
        url:"classmessage",
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
        hidden:true,
      },
      {
        field : 'cl_grade',
        title : '年级',
        width:150,
        sortable : true,
        editor : {
          type : 'numberspinner',
          options : {
            required : true,
            value:[year],
          },
        },
      },
      {
        field : 'major_id',
        title : '专业ID',
        sortable : true,
        width : 100,
        checkbox : true,
        hidden:true,
      },
      {
        field : 'major_name',
        title : '专业',
        width:150,
        sortable : true,

        editor : {
          type : 'combobox',
                 options : {
                    valueField:'value',
                    textField:'text',
                    editable:false,
                    //url:'data'//;

                  data:eval('('+val+')'),

                    panelHeight:150
                },
        },
      },
           {
        field : 'cl_classes',
        title : '班级',
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
        field : 'admin_id',
        title : '班主任ID',
        sortable : true,
        width : 100,
        checkbox : true,
        hidden:true,
      },
    {
        field : 'cl_headmaster',
        title : '班主任',
        width:150,
        sortable : true,
        editor : {
          type : 'combobox',
                 options : {
                    valueField:'value',
                    textField:'text',
                    editable:false,
                    //url:'data'//;

                  data:eval('('+ban+')'),

                    panelHeight:150
                },
        },
      },

       {
        field : 'cl_remarks',
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
                        major_id:rowData.major_id,
                        major_name:rowData.major_name,
                        cl_classes:rowData.cl_classes,
                        cl_headmaster:rowData.cl_headmaster,
                        cl_remarks:rowData.cl_remarks,
                        admin_id:rowData.admin_id,
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
                          msg : rowData.cl_grade+rowData.major_name+ '年级被' + info + '成功！',
                        });
                        obj.editRow = undefined;
                      }
                    },
                  });

          /////////////////////////

          }


      });


    });



