/**
 * TickTack.js
 * requestAnimationFrameをsetInterval的に繰り返すラッパークラス
 *
 * Copyright (c) 2014 SUSH ( http://sus-happy.net )
 *
 * Licensed under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php )
 *
 * new TickTack( function, fps );
 * start
 *   定期実行を開始する
 * stop
 *   定期実行を終了する
 * update
 *   定期実行のハンドラー
 *
 * ex)
 * var tick = new TickTack( someFunc, fps );
 * tick.start();
 */

( function( win, U ) {

    /**
     * requestAnimationFrame のPolyFill
     * 非対応の場合は、setTimeout を利用する
     */
    var animation_frame = window.requestAnimationFrame
                       || window.webkitRequestAnimationFrame
                       || window.mozRequestAnimationFrame
                       || window.setTimeout;

    /**
     * cancelAnimationFrame のPolyFill
     * 非対応の場合は、clearTimeout を利用する
     */
    var cancel_frame    = window.cancelAnimationFrame
                       || window.cancelRequestAnimationFrame
                       || window.webkitCancelAnimationFrame
                       || window.webkitCancelRequestAnimationFrame
                       || window.mozCancelAnimationFrame
                       || window.mozCancelRequestAnimationFrame
                       || window.msCancelAnimationFrame
                       || window.msCancelRequestAnimationFrame
                       || window.oCancelAnimationFrame
                       || window.oCancelRequestAnimationFrame
                       || window.clearTimeout;

    /**
     * Date.now のPolyfill
     * IE8以前ではDate.nowが無いため
     */
    if ( Date.now === U ) {
        Date.now = function () {
            return new Date().valueOf();
        };
    }

    /**
     * TickTackクラス、コンストラクタ
     *
     * @param function func コールバック関数
     * @param number   fps  実行間隔（フレーム秒）
     */
    win.TickTack = function( func, fps ) {
        this._ID   = null;
        this._func = func;
        this._ms   = 1000/fps;
        this._from = 0;
        this._run  = false;
    };

    /**
     * FPSを変更する
     */
    win.TickTack.prototype.setFps = function( fps ) {
        this._ms = 1000/fps;
    }

    /**
     * コールバック関数を変更する
     */
    win.TickTack.prototype.setFunc = function( func ) {
        this._func = func;
    }

    /**
     * 定期実行を開始する
     */
    win.TickTack.prototype.start = function() {
        this._run  = true;
        this._from = Date.now();
        this._handler();
    };

    /**
     * 定期実行を終了する
     */
    win.TickTack.prototype.stop = function() {
        cancel_frame( this._ID );
        this._run  = false;
        this._ID   = null;
        this._from = 0;
    };

    /**
     * 定期実行のハンドラー
     */
    win.TickTack.prototype._handler = function() {
        var that = this;
        if( this._run ) {
            var now = Date.now();
            // 経過時間がmsを超えている場合に関数を実行
            if( ( now-this._from ) / this._ms > 1 ) {
                this._from += this._ms;
                if( typeof this._func == 'function' ) {
                    this._func();
                }
            }

            this._ID = animation_frame( function() {
                that._handler();
            }, this._ms );
        }
    };

} )( window );
