pipeline {
    agent {
        dockerfile {
      		filename 'Dockerfile.ci'
      		args '-v /etc/group:/etc/group:ro ' +
           	     '-v /etc/passwd:/etc/passwd:ro ' +
           	     '-v /var/lib/jenkins:/var/lib/jenkins ' +
           	     '-v /usr/bin/docker:/usr/bin/docker:ro ' +
           	     '--network=host' 
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
	/* 
	stage('Test') {
            steps {
		
        	sh 'ln -sf /node_modules ./'
                sh 'npm run unit'
                sh 'npm run e2e'	
            }
        }
	*/
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
        	sh 'ls'
        	sh 'pwd'
		archive 'platforms/android/app/build/*'
            	archiveArtifacts artifacts: 'platforms/android/app/build/**/*.apk', fingerprint: true
    	}
  }
}