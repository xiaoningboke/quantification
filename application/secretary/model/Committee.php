<?php
//添加量化委员表班级ID
namespace app\secretary\model;

use think\Model;
use think\Db;
use think\request;

class Committee extends Model{
    //设置当前模型对应的完整数据表名称
    protected $table = 'committee';



    public function addcommittee($classes_id)
    {

        $data = new Committee;
        $data->classes_id = $classes_id;

       $result = $data->save();
       return $result;
    }

}
