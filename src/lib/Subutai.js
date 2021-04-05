import axios from "axios"
export default {
    ajaxActivationCount:0,

    isLoading() {
        return this.ajaxActivationCount > 0;
    },

    defaultError(msg,details) {
        console.log(details);
    },

    ajax(url,data,onSuccess,onError) {
            
        let self = this;
        var err = ( typeof onError === "function" ? onError : self.defaultError );
        self.ajaxActivationCount += 1;
        axios.post(url,(data ? data : null )).then( (response)=>{
            if (self.ajaxActivationCount>0) {
                self.ajaxActivationCount -= 1;
            } 
            if ( typeof response.data === "object" && typeof response.data.success === "boolean" ) {
                if (response.data.success) {
                    if ( typeof onSuccess === "function" ) {
                        onSuccess( response.data.data );
                    }
                } else {
                    err( response.data.message,response.data );
                }
            } else {
                err( "Ajax response is unexpected",response.data );
            }
        }).catch((error)=>{
            if (self.ajaxActivationCount>0) {
                self.ajaxActivationCount -= 1;
            } 
            err( error.message,error );
        });
    },

    meta(jwt) {

        var backend = document.querySelector("meta[name='backend']");
        if (backend!==null) {
            var raw = backend.getAttribute("content");
            try {
                var arr = raw.split("|");
                if (arr[1]) {
                    return jwt.verify(arr[0],arr[1]);
                } else {
                    return null;
                }            
            } catch(err) {
                console.log(err);
                return null;
            }
        } else {
            return null;
        }             
    }
}