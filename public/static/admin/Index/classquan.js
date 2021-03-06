
$(function(){


      $('#tt').datagrid({
        width:980,
        //height:不设让它自适应
        title:"班级人员" ,
        url:"quanDetails?classid="+$('#classid').val(),
        iconCls:'icon-save',
        striped:true,//自适应
        pagination:true,//可扩展面板
        nowrap:true,
        singleSelect :true,
        // fit:true,自适应不太好看，可以试着开启
        rownumbers:true,//显示行号
        columns : [[
        {
        field : 'Id',
        title : '编号',
        sortable : true,
        width : 100,
        // checkbox : true,
        hidden:true,
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
        field : 'fo_fraction',
        title : '分数',
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
      }
    ]],
        pagination:true,//分页功能
        pageSize:10,//每页显示条数
        pageList : [10, 15, 20],//可选择的分页
        pageNumber : 1,//默认初始化页码
        pagePosition : 'bottom',//分页的位置


      });



});


