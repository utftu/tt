# tt - text template #

## About ##

```shell script
    npm install @utft/tt
```

**tt** replace variables like `$FOO` `${FOO}` and `{{FOO}}`

**tt** can be used pro by **cli** and **programmatically**

- If input is file **tt** place new file in output path  
- If input is dir **tt** replace variables recursive in files and subdirs and place them in output dir relatively by
 their path from input dir
 
cli **tt** has a format ```tt input output```
 
## Cli options ##

- `-e FOO=bar` and `--env FOO=bar` add variable
- `--env-file /.env` add variables form file
 
## Examples ##

### Cli file ###

##### initial paths
```/input/file```  
```/output/```  

##### file by path ```/input/file```
```
Lorem $FOO ipsum ${FOO} dolor sit {{FOO}} amet
```

##### command
```npx @utft/tt -e FOO=bar /input/file /output/new/path/file```

##### result paths 
```/input/file```  
```/output/new/path/file```  

##### file by path ```/output/new/path/file``` 
```
Lorem bar ipsum bar dolor sit bar amet
```

### Cli dir ###

##### initial paths 
```/input/file```  
```/input/subdir/file```  
```/output/```  

##### file by path ```/input/file``` 
```
Lorem $FOO ipsum ${FOO} dolor sit {{FOO}} amet
```

##### file by path ```/input/subdir/file``` 
```
Lorem $FOO ipsum ${FOO} dolor sit {{FOO}} amet
```

##### command 
```npx @utft/tt -e FOO=bar /input /output```

##### result paths 
```/input/file```  
```/input/subdir/file```  
```/output/file```  
```/output/subdir/file```  

##### file by path ```/output/file``` 
```
Lorem bar ipsum bar dolor sit bar amet
```

##### file by path ```/output/subdir/file``` 
```
Lorem bar ipsum bar dolor sit bar amet
```

### Programmatically replace variables in files

```js
    import tt from '@utft/tt'

    ;(async () => {
        const env = {FOO: 'bar'}
        const replacedString = await tt.convertFiles('/path/to/input', 'path/to/output', env)
    })()
```

### String prepare ###

**tt** can prepare string to insert variables, **tt** looks for variables only once when call tt.prepare(), further **it** only substitutes the variables

```js
    import tt from '@utft/tt'
    import fs from 'fs'

    const textToReplace = '$FOO 1 ${FOO} 2 {{FOO}}'
    const preparedToInsert = tt.prepare(textToReplace)
    preparedToInsert({FOO: 'bar'}) // 'bar 1 bar 2 bar'
    preparedToInsert({FOO: 'ho'}) // 'ho 1 ho 2 ho'
```
