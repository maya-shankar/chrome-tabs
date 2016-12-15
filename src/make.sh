rapydscript -b -m -p hello.py > hello.js
rm -rf compiledpythonextension/hello.js
mkdir compiledpythonextension
mv hello.js compiledpythonextension
