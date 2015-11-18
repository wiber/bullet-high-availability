#!bin/bash
pkill -f meteor &
function trap_ctrlc ()
{
   # perform cleanup here
   echo "Ctrl-C caught...performing clean up"
   pkill -f meteor
   pkill -f mongo
   echo "Doing cleanup"

   # exit shell script with error code 2
   # if omitted, shell script will continue execution
   exit 2
}

# initialise trap to call trap_ctrlc function
# when signal 2 (SIGINT) is received

# this breaks when another process listens to the signal ..?
trap "trap_ctrlc" 2
for branch in `git branch -r | grep -v HEAD`;do echo -e `git show --format="%ci %cr" $branch | head -n 1` \\t$branch; done | sort -r &
echo "'sh env.sh'" &
cd search
echo "`PORT=6000 sh .devrun.sh > app.log`" &
cd ..
cd web
echo "`PORT=3000 sh .devrun.sh > app.log`" &
cd ..
mongod > mongod.log &
#tail -f web.log
#source PORT=6000 ./search/.devrun.sh > search.log &
#source PORT=3000 ./web/.devrun.sh > web.log &
