<?php


return  [
    //验证码
    'captcha'    =>  [
            // 验证码字符集合
            'codeSet'  => '2345678abcdefhijkmnpqrstuvwxyzABCDEFGHJKLMNPQRTUVWXY',
            // 验证码字体大小(px)
            'fontSize' => 16,
            // 是否画混淆曲线
            'useCurve' => true,
             // 验证码图片高度
            'imageH'   => 34,
            // 验证码图片宽度
            'imageW'   => 120,
            // 验证码位数
            'length'   => 4,
            // 验证成功后是否重置
           'reset'    => true
    ],

];

