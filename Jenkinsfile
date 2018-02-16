env.BUILD_PACKAGE_FILE = "${BUILD_NUMBER}.tar.gz"

def extcode
def props

timestamps {
    node('master') {
        stage ('Checkout') {
            sh 'rm -rf workspace/*'
            checkout scm
            props = readProperties file: 'jenkins.properties'
            
            if (props != null && props.size() > 0)
                propsToEnv(props)
            else
                error("Erro ao recuperar arquivo de propriedades!")
        }
        
        stage ('Build / Test') {
            sh 'sudo npm install'
            sh 'NODE_ENV=testing ./bin/build.sh'
        }
        
        stage ('Deploy QA') {
            deployRemotoQA("jenkins", "$FRONTEND_SERVER_QA")
        }        
    }
}

promoverHMGStage()

timestamps {
    node('master') {
        stage ('Deploy HML') {
            sh 'NODE_ENV=staging ./bin/build.sh'
            deployRemoto("dvopsusr","$FRONTEND_SERVER_HML")
        }
    }
}


timestamps {
    stage ('Release') {
        def releaseType
        try {
            timeout(time: 3, unit: 'HOURS') {
                releaseType = input message: 'Fechar versão?', parameters: [[$class: 'hudson.model.ChoiceParameterDefinition', choices: 'major\nminor\npatch', description: 'Tipos de release', name: 'release']]
            }
        } catch (err) {
            println "Abortada"
            throw err
        }
        release(releaseType)
    }
}

def deployRemotoQA(user, server) {
    echo "SCP LOCAL para $server"
    sh "ssh $user@$server mkdir -p $FRONTEND_PATH_QA/$BUILD_NUMBER"
    sh "scp ./release/$BUILD_PACKAGE_FILE $user@$server:$FRONTEND_PATH_QA/$BUILD_PACKAGE_FILE"
    sh "ssh $user@$server tar -zxvf $FRONTEND_PATH_QA/$BUILD_PACKAGE_FILE -C $FRONTEND_PATH_QA/$BUILD_NUMBER"
    sh "ssh $user@$server sudo docker rm -f $CONTAINER_NAME || echo 'Nenhum container a ser removido'"
    sh "ssh $user@$server " + "\"" +  "sudo docker run -dit --name $CONTAINER_NAME -p $PORT:80 -v $FRONTEND_PATH_QA/$BUILD_NUMBER:/usr/local/apache2/htdocs/ $IMAGE_NAME"  + "\""
}

def deployRemoto(user, server) {
    echo "SCP LOCAL para $server"
   // sh "ssh $user@$server mkdir -p $FRONTEND_PATH/$BUILD_NUMBER"
    sh "scp ./release/$BUILD_PACKAGE_FILE $user@$server:$FRONTEND_PATH/$BUILD_PACKAGE_FILE"
    sh "ssh $user@$server rm -rf /webaplic/minhaoi/minhaoi/digital/*"
    sh "ssh $user@$server tar -zxvf $FRONTEND_PATH/$BUILD_PACKAGE_FILE -C /webaplic/minhaoi/minhaoi/digital/"
}

@NonCPS
def propsToEnv(propsMap) {
    for (entry in propsMap) {
        env."${entry.key}" = entry.value
    }
}

def release(rType) {
    println "Release    " +rType
    node('master') {
        sh "npm version ${rType} -f --verbose"
        git_branch = sh (script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
        
        sh "git push origin HEAD:$git_branch"
        sh "git push origin --tags"
        sh "cp package.json $DIR_DIST"
        sh "npm publish $DIR_DIST --tag latest"
        
        notifyRelease(rType)
    }
}

def promoverHMGStage() {
     timestamps {
        stage ('Promover') {
            try {
                timeout(20) {
                    input 'Promover para Homologação?'
                }
            } catch(err) {
                println "Saída por timeout"
                throw err
            }
        }
    }
}

def notifyRelease(def rType) {
    def version = getVersion()
    def lastUser = getUser()
    
    mail cc: 'luiz.valente',
         subject: "RELEASE: ${env.JOB_NAME}",
         body: """ Fechamento da versão do projeto. 
                  
              Projeto: ${env.JOB_NAME}
              Tipo de Versão: ${rType}
              Versão: ${version}
              Usuário: ${lastUser} """
    
    
    manager.addBadge("package.gif", "Versão: ${version} Usuario: ${getUser()}")
    manager.createSummary("package.gif").appendText("<b>Versão:</b> ${version}<br><b>Usuario:</b> ${getUser()}", false, false, false, "black")

}

def getVersion() {
    def version = sh (script: 'PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: \'{ print $2 }\' | sed \'s/[\\",]//g\' | tr -d \'[[:space:]]\') && echo $PACKAGE_VERSION', returnStdout: true).trim()
    return version
}

def getUser() {
   def latestUser = null

   def acts = currentBuild?.rawBuild?.getAllActions()
   for (act in acts) {
       if (act instanceof org.jenkinsci.plugins.workflow.support.steps.input.ApproverAction) {
           latestUser = act?.getUserName()
       }
   }

   return latestUser
}