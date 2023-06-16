pipeline {
     agent any
     stages {
        stage("Build") {
            steps {
                sh "npm cache clear --force"
                sh "sudo npm install -g npm@6.14.6"
                sh "sudo npm install --legacy-peer-deps"
                sh "sudo npm run build"
            }
        }
        stage("Deploy") {
            steps {
                sh "sudo cp -r ${WORKSPACE}/build/* /home/buoyante/public_html/admin"
            }
        }
    }
}
