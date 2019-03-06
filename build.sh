source ~/.bash_profile
mkdir -p output
eslint --ext .js,.vue --format=checkstyle resources/src -o output/eslint-result.xml
