#/bin/bash

#Refresh web docs
rm -rf docs/

FILES=$(find content/ | grep .enc)
for file in $FILES ; do
	trunc=$(basename $file .enc)
	dir=$(dirname $file)
	#echo $file - $dir$trunc
	gpg --batch --yes --armor --output $dir/$trunc.md --decrypt $file

	# rm -f $file
done
#hugo
