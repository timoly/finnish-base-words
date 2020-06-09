Ugly hack for adding finnish base words to a list of finnish words.
This is done with a node script using hfst cli tool in background.

- install hfst & create finntreebank.hfst
  - https://github.com/hfst/hfst/wiki/Download-And-Install#installing-hfst-to-mac-os-x
  - https://github.com/hfst/hfst/wiki/Quick-Start-to-Tools

  - wget http://apertium.projectjj.com/osx/nightly/hfst-latest.tar.bz2
  - wget http://hfst.github.io/downloads/finntreebank.lexc
  - tar zxf hfst-latest.tar.bz2
  - ./hfst/bin/hfst-lexc -v -f foma finntreebank.lexc -o finntreebank.inverted.hfst
  - ./hfst/bin/hfst-invert -v finntreebank.inverted.hfst -o finntreebank.debug.hfst
  - ./hfst/bin/hfst-fst2fst -v finntreebank.debug.hfst -f olw -o finntreebank.hfst
  - npm start
