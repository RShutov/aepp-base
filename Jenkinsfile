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
    stage('Lint') {
      steps {
        sh 'echo test'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'build/outputs/apk/debug/app-debug.apk', fingerprint: true
    }
  }
}
