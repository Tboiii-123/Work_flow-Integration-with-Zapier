import React from "react";







var isregister=true;


function logged(){

    if(isregister === false){
    return(
            <h1>Hello User</h1>
            
    )
    }
    else{
        return(
            <div>

        
        <Input
          type='password'
          placeholder ='Your Password'
          authenticate='false'

          
        />
        

              
        </div>

        );

      
    }   
}



function App(){
        return(
            <div>
                    {  logged()   }
        
                </div>
        
        )
}




export default App;