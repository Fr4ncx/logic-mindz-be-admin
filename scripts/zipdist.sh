rm -f ./logic-mindz.zip
rm -rf ./bin
mkdir ./bin
cd ./bin
mkdir environments
cp -r  ../dist/* ../Dockerfile ../package.json ../package-lock.json ../node_modules .

case $1 in
	prod)
		cp ../environments/prod.env ./environments/.env
	;;
	*)
		echo "Invalid environment"
	;;
esac

mv Dockerfile Dockerfile

zip -qr ../logic-mindz.zip .