# Devs-Unleashed-Hackathon

Original documentation: 
https://developer.atlassian.com/platform/forge/getting-started/

## How to install Application
1. create new developer site http://go.atlassian.com/cloud-dev in order to not face any issues
2. OPEN ADMIN CDM

3. install forge
```
npm install -g @forge/cli
```
3. create API token in jira https://id.atlassian.com/manage/api-tokens
4. forge login (in windows use right click to paste in Admin CMD)
```
forge login
```
5. forge create
```
forge create
```
6. copy app id from manifest.yml in newly created app

7. clone this repo
```
git clone git@github.com:itsyndicate/Devs-Unleashed-Hackathon-forge.git
```
8. put copied app id to manifest.yml cloned repository
9. cd Devs-Unleashed-Hackathon-forge/tama-custom
10. npm install
```
npm install
```
11. enable development mode
    11.1 navigate to https://{YOUR_DOMAIN}.atlassian.net/plugins/servlet/upm?source=side_nav_manage_addons
    11.2 click on "setting"
    11.3 click checkbox Enable development mode
12. cd tama-custom/static/hello-world/src
13. run npm install again
    ```
    npm install --legacy-peer-deps
    ```
14. build project
    ```
    npm run build
    ```
15. cd ../../tama-custom
16. deploy
    ```
    forge deploy
    ```
    16.1. if you have some issues with deployment
    ```
    forge deploy --no-verify
    ```
17. install
    ```
    forge install
    ```