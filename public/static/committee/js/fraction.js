$(function(){

obj ={
  editRow : undefined,//设置变量默认值
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
                              msg : data + '个记录被删除成功！',
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
};
      $('#tt').datagrid({
        width:980,
        //height:不设让它自适应
        title:"班级人员" ,
        url:"fractionmessage",
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
        field : 'studentunion_id',
        title : '学生会',
        width:150,
        sortable : true,
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
        field : 'classes_name',
        title : '班级',
        width:150,
        sortable : true,
        editor : {
          type : 'combobox',
                 options : {
                    required : true,
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
        field : 'dy_name',
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
      field : 'dy_time',
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
        field : 'dy_reason',
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
        field : 'dy_fraction',
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
        field : 'dy_remarks',
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

      });


    });
