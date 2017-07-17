
$(function(){

      $('#tt').datagrid({
        width:980,
        // height:300,不设让它自适应
        title:"班级人员" ,
        url:"classDetails?classid="+$('#classid').val(),
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
        width : 100,
        checkbox : true,
      },
      {
        field : 'nt_number',
        title : '学号',
        width:150,
      },
      {
        field : 'nt_name',
        title : '姓名',
        width:150,
      },
      {
        field : 'nt_sex',
        title : '性别',
        width:150,
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
                        text: '请选择'
                    },
                    {
                        value: 0,
                        text: '男'
                    },{
                        value: 1,
                        text: '女'
                    }],
                    panelHeight:75
                },
            },
      },
      {
        field : 'nt_idnumber',
        title : '身份证号',
        width:150,
      },
       {
        field : 'nt_remarks',
        title : '备注',
        width:150,
      },
    ]],



      });


    });


