# TickTack.js

requestAnimationFrameをsetInterval的に繰り返すラッパークラス  
間隔はあまり一定じゃないけど、fpsに対する実行回数はある程度がんばってくれる（はず）

## 使い方

    var someFunc = function() { /* 何か処理 */ };
    var fps      = 30; // 30FPS : 1秒間に30回実行
    var tick = new TickTack( someFunc, fps );

    // 実行開始
    tick.start();

    /* … */

    // 停止させたい時
    tick.stop();

## License

MIT

## Demo

[Hear](http://sushat4692.github.io/TickTack.js/)

各インターバルの実行時間はバラバラだけど、実行時間の総計は結構近いと思います。
