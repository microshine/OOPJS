window.Class = new (function Class() {
    this.inherit = function(a, b) {
        a.__proto__ = new b();
        var _type = arguments.callee.caller.name;
        // create type function
        Object.defineProperty(
                a,
                "type",
                {
                    get:function(){
                        return _type;
                    },
                    enumerable:true
                }
        );
        //create _this function
        Object.defineProperty(
                a,
                "_this",
                {
                    get:function(){
                        return a;
                    }
                }
        );
        //create _self function
        Object.defineProperty(
                a,
                "_self",
                {
                    get:function(){
                        return a.__proto__;
                    }
                }
        );
    };
});