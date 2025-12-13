(module
  (global $next i32)
  (global.set $next (i32.const 0))
   (func $storeVariable ()
        (result i32)
       (global.set next (i32.add global.next (i32.const 8)))
       (global.get (i32.sub global.get $next (i32.const 8)));;Address of variable
   )
   (func $setVariable(param $type i32)(param $address i32)(param $value f32)
       local.get $type 
       i32.const 1
       i32.lt_e
       (if (result i32)(then
          (local.get $value
           local.get $address
           i32.store)
        )
        (else
            (local.get $value
           local.get $address
            f32.store)
        )
       )
   )
)