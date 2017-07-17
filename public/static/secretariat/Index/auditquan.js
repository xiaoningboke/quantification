$(function(){

$('#tt').datagrid({
title:'班级量化管理',
iconCls:'icon-edit',
width:950,
height:400,
singleSelect:true,
url:"quanDetails",
columns:[[
    {
      field:'Id',
    title:'ID号',
     width:100
    },
    {
      field:'classes_id',
    title:'班级id',
    width:100
   },
    {
      field:'studentunion_id',
      title:'学生会id',
      width:100
    },
    {
      field:'dy_name',
      title:'姓名',
      width:100
    },
    {
      field:'dy_time',
      title:'时间',
      width:100
    },
    {
      field:'dy_reason',
      title:'原因',
      width:100
    },
    {
      field:'dy_fraction',
      title:'分数',
      width:100
    },
    {field:'action',title:'操作',
    align:'center',
    formatter:function(value,row,index){
    var e = '<a href="#" onclick="saverow('+index+')">审核</a> ';
    var d = '<a href="#" onclick="deleterow('+index+')">否决</a>';
    return e+d;
        }
    }
]],
    pagination:true,//分页功能
    pageSize:10,//每页显示条数
    pageList : [10, 15, 20],//可选择的分页
    pageNumber : 1,//默认初始化页码
    pagePosition : 'bottom',//分页的位置

});


});




//否决审核的信息
function deleterow(index){
$.messager.confirm('确认','是否真的删除?',function(r){
if (r){
$('#tt').datagrid('deleteRow', index);

        var rowData = $('#tt').datagrid('getData').rows[index];
        console.log(rowData);

            //ajax审核通过
    $.ajax({
                    type : 'POST',
                    url : 'Auditveto',
                    data : {
                         Id:rowData.Id
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
                          msg :  '量化审核被否定！',
                        });

                      }
                    },
                  });
}
});
}

//审核量化信息
function saverow(index){
    $.messager.confirm('确认','是否真的审核通过?',function(r){
    if (r){
    var rowData = $('#tt').datagrid('getData').rows[index];
    console.log(rowData);
    //ajax审核通过
    $.ajax({
                    type : 'POST',
                    url : 'Audited',
                    data : {
                         Id:rowData.Id
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
                          msg :  '量化审核通过！',
                        });

                      }
                    },
                  });
    }
});
//然后上传审核的数据就可以了
}
