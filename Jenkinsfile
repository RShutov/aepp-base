pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile.ci'
      args '-v /etc/group:/etc/group:ro ' +
           '-v /etc/passwd:/etc/passwd:ro ' +
           '-v /var/lib/jenkins:/var/lib/jenkins'
    }
  }

  stages {
    stage('Build') {
      steps {
        sh 'ln -sf /node_modules ./'
        sh 'npm run build'
      }
    }

    stage('Lint') {
      steps {
        sh 'ln -sf /node_modules ./'
        sh 'npm run lint'
      }
    }

    stage('Android Build') {
      steps {
        sh 'ln -sf /node_modules ./'
        sh 'cordova platform add android'
        sh 'npm run build:android'
        sh 'npm run gen:cordova-resources'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'platforms/**/*.apk', fingerprint: true
    }
  }
}
