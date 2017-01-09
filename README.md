# Await Node Repl

## Blog post
https://medium.com/@sibelius/node-repl-with-await-syntax-6e351e347292#.cnqogx385

## Setup

First, install deps

```
yarn
```

Then run the repl and start hacking

```
yarn run repl
```

## Examples

### Do a fetch in a website
```
> const response = await fetch('http://example.com');
> const data = await response.json();
```

### Work with database models
```
> await connectDatabase();
> const user = await User.find(); // get all users
```

### Play with a package
> import faker from 'faker'
> faker.internet.password()

### Add some data and functions to repl context

add something like this to repl.js

```
repl.context.myfunc = myfunc;
```

test it

```
> myFunc()
```

\o/
