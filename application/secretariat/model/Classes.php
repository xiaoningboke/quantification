<?php
//修改专业的模型
namespace app\secretariat\model;

use think\Model;
use think\Db;


class Classes extends Model
{
    /*设置当前模型对于的完整数据表名称*/
    protected $table = 'Classes';

    /**
     * 通过班级id查找年级名
     * @param  [type] $class_id [description]
     * @return [type]           [description]
     */
    public function selectClass($class_id)
    {
        $classes = Db::name('Classes');
        $data = $classes
                    ->where('Id',$class_id)
                    ->find();
        return $data;

    }




}
