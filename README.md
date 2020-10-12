# tt - text template #

## About ##

**tt** replace variables like `$FOO` `${FOO}` and `{{FOO}}`

**tt** has a format ```tt source target```

- If source is file **tt** place new in file in target path  
- If source is dir **tt** replace variables recursive in files and subdirs and place them in target dir relatively by
 their path from source dir
 
## Options ##

- `-e FOO=bar` and `--env FOO=bar` add variable
- `--env-file /.env` add variables form file
- `--source /source` set **source** instead 1-st argument 
- `--target /target` set **source** instead 2-nd argument 
 
## Examples ##

### Cli file ###

#### initial paths ####
```/source/file```  
```/target/```  

#### file by path ```/source/file``` ####
```
Lorem $FOO ipsum ${FOO} dolor sit {{FOO}} amet
```

#### command ####
```npx @utft/tt -e FOO=bar /source/file /target/new/path/file```

#### result paths ####
```/source/file```  
```/target/new/path/file```  

#### file by path ```/target/new/path/file``` ####
```
Lorem bar ipsum bar dolor sit bar amet
```

### Cli dir ###

#### initial paths ####
```/source/file```  
```/source/subdir/file```  
```/target/```  

#### file by path ```/source/file``` ####
```
Lorem $FOO ipsum ${FOO} dolor sit {{FOO}} amet
```

#### file by path ```/source/subdir/file``` ####
```
Lorem $FOO ipsum ${FOO} dolor sit {{FOO}} amet
```

#### command ####
```npx @utft/tt -e FOO=bar /source /target```

#### result paths ####
```/source/file```  
```/source/subdir/file```  
```/target/file```  
```/target/subdir/file```  

#### file by path ```/target/file``` ####
```
Lorem bar ipsum bar dolor sit bar amet
```

#### file by path ```/target/subdir/file``` ####
```
Lorem bar ipsum bar dolor sit bar amet
```
