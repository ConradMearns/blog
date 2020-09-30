#/bin/bash

#Refresh web docs
rm -rf docs/

#refresh encrypted files
find . -name "*.enc" -type f -delete

FILES=$(find content/ | grep .md)
for file in $FILES ; do
	trunc=$(basename $file .md)
	dir=$(dirname $file)
	gpg --batch --yes --armor --output $dir/$trunc.enc --encrypt --recipient-file conrad.key $file
	#rm -f $file
done

#Build
hugo

cp CNAME docs/CNAME

#Remove double encrypted FILES
# find docs/ -name "*.enc" -type f -delete
