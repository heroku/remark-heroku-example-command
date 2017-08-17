### `heroku access:add EMAIL`

*add new users to your app*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--permissions`|list of permissions comma separated|
||`--privileges`||

#### Examples:

```term
heroku access:add user@email.com --app APP # Add a collaborator to your app
heroku access:add user@email.com --app APP --permissions deploy,manage,operate # permissions must be comma separated
```


[(top)](#table-of-contents)
