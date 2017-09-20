<?php
//修改专业的模型
namespace app\secretariat\model;

use think\Model;
use think\Db;


class Major extends Model
{
    /*设置当前模型对于的完整数据表名称*/
    protected $table = 'Major';

    /**
     * 通过班级id找到专业简称
     */
    public function selectMajor($majorid)
    {
        $major = Db::name('Major');
        $data = $major->where('Id',$majorid)
                ->find();
        return $data['ma_abbreviation'];

    }


}
