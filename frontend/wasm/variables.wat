(module
   (global $next i32)
   (global.set $next (i32.add $next (i32.const 0)))
   (func $createVariable (result i32)
       (global.set $next (i32.add global.get $next (i32.const 256))
       (i32.sub global.get $next (i32.const 256));;Address where variable will be stored
   )
   (func $assignToVariable (param $type i8)(param $value f32)(param $address i32)
         local.get $address
         i32.const 1
         i32.lt_e
         (if(result i32)
            (then
               (local.get $value
                local.get $address
                i32.store
               )
            )
            (else
                (local.get $value
                local.get $address
                f32.store
               )
            )
         )
   
   )
   (export "createVariable" (func $createVariable))
   (export "assign"(func $assignToVariable))
)