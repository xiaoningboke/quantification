<?php
namespace app\secretariat\controller;



use app\common\Common;


use app\secretariat\Model\Dynamic;
use app\secretariat\Model\Studentunion;
use app\secretariat\Model\Classes;
use app\secretariat\Model\Major;

use think\View;     //视图类
use think\Session;

class Index extends Common
{
    /**
     * 秘书处模块首页设置
     * @return [type] [description]
     */
   public function index()
   {
     //先查找班主任管理班级
      $name =  session('name');//秘书处登录名字
       $view = new View();
       $view->assign('secretariat',$name);//传去秘书处名字
       return $view->fetch();
  }

  //量化详细内容
  public function quanDetails()
  {
      $sort =  input('post.sort');//排序字段

      $page = isset($_POST['page'])?intval($_POST['page']):1;//默认页码
      $rows = isset($_POST['rows'])?intval($_POST['rows']):5;//默认行数

      $dynamic = model('Dynamic');

        $result = $dynamic->retrieveDynamic($page,$rows,$sort);

      $studentunion = model('Studentunion');
            foreach ($result as $key =>$value) {
      $result[$key]['dy_time']=date('Y年m月d日', $result[$key]['dy_time']);
      $result[$key]['classes_id']= $this->fullName($result[$key]['classes_id']);
      $result[$key]['studentunion_id'] = $studentunion->selectName($result[$key]['studentunion_id'])
 ;

            }

      $result = json_encode($result);
      $total = $dynamic->countDynamic();

      $result = substr($result, 0, -1);
      $result = '{"total" : '.$total.', "rows" : '.$result.']}';

      echo $result;
  }

  /**
   * 查找班级全称
   * @param  [type] $class_id [description]
   * @return [type]           [description]
   */
  public function fullName($class_id)
  {

      $classname = model('Classes');
      $data = $classname->selectClass($class_id);//查找班级全称
      $sub_cl_grade = substr($data['cl_grade'], 2, 2);
      $classname = "{$sub_cl_grade}级";//找到班级名
      $majorname = model('Major');
      $major = $majorname->selectMajor($data['major_id']);//找到专业简称majorid
      $number  = "{$classname}{$major}{$data['cl_classes']}班";
      return $number;

  }


  /**
   * 审核量化
   */
  public function Auditquan()
  {
       $view = new View();
       return $view->fetch();
  }

  /**
   * 量化通过
   */
  public function Audited()
  {
     $Id = input('post.Id');
     $dynamic = model('Dynamic');
      $result = $dynamic->quanAudited($Id);//返回判断性
      echo $result;
  }

  /**
   * 量化否决
   */
  public function Auditveto()
  {
     $Id = input('post.Id');
     $dynamic = model('Dynamic');
    $result = $dynamic->quanAuditveto($Id);//返回判断性
    echo $result;
  }

 /**
    * 修改信息首页
    * @return [type] [description]
    */
   public function modifyInfo()
   {
       //先查找学生id

      $studentunion = model('Studentunion');
      $info = $studentunion->selectSecretariat();
      $view = new View();
      $view->assign('info',$info);

      return $view->fetch('self');
   }

   /**
    * 修改秘书处信息
    * @return [type] [description]
    */
   public function reviseMessage()
   {
      $number = input('post.number');
      $name = input('post.name');
      $email = input('post.email');
      $studentunion = model("Studentunion");
      $result = $studentunion->modifyMessage($number,$name,$email);

       if($result){
       $this->success('修改成功','Secretariat/Index/modifyInfo');
      }else{
        $this->error('修改失败','Secretariat/Index/modifyInfo');
      }
   }

   /**
    * 修改密码首页
    * @return [type] [description]
    */
   public function modifyPass()
   {
       $view = new View();
       // $view->assign('classid',$classid);
      return $view->fetch('password');
   }

   /**
    * 修改密码信息
    */

   public function revisePwd()
   {

      $oldpassword =  input('post.oldpassword');
      $password =  md5(input('post.password'));
       $studentunion = model("Studentunion");
      $pass = $studentunion->studentPwd($password);
            if( md5($oldpassword) == $pass)
            {
                $result = $studentunion->modifyPwd($password);
                if($result){
                     $this->success('修改成功','Secretariat/Index/modifyPass');
                }else{
                    $this->error('修改失败','Secretariat/Index/modifyPass');
                }
            }else{
                $this->error('原密码错误','Secretariat/Index/modifyPass');

            }
   }

   /**
      * 联系我们
      * @return [type] [description]
    */
    public function contact(){
        return $this->fetch();
    }

    /**
     * 退出登录
     * @return [type] [description]
     */
    public function signout(){
       $this->redirect('Index/Index/clearSession');
    }


}

