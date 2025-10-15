// pipeline {
//     agent any

//     tools {
//         nodejs 'NodeJS 20.x'
//     }

//     environment {
//         APP_NAME = 'front-a-deux-pas'
//     }

//     stages {
//         // stage('Checkout') {
//         //     steps {
//         //         checkout scm
//         //     }
//         // }

//         stage('Install Dependencies') {
//             steps {
//                 sh 'npm ci'
//             }
//         }

//         stage('Build') {
//             steps {
//                 sh 'npm run build:ci'
//             }
//         }

//         // stage('Run E2E Tests') {
//         //     steps {
//         //         script {
//         //             sh 'npm start -- --host 0.0.0.0 &'
//         //             sh 'npx wait-on http://localhost:4200'
//         //             sh 'npx cypress run --spec "src/app/shared/tests/e2e/**/*.cy.ts"'
//         //         }
//         //     }
//         // }

//         // stage('Run Component Tests') {
//         //     steps {
//         //         sh 'npx cypress run --component --spec "src/app/shared/tests/unit/**/*.cy.ts"'
//         //     }
//         // }

//         stage('Set Application Version') {
//             steps {
//                 script {
//                     env.APP_VERSION = getApplicationVersion()
//                     echo "Application version = ${env.APP_VERSION}"
//                 }
//             }
//         }

//         stage('Archive Artifacts') {
//             steps {
//                 sh "cd dist && zip -r ../${APP_NAME}-${env.APP_VERSION}.zip ."
//                 archiveArtifacts artifacts: "${APP_NAME}-${env.APP_VERSION}.zip", fingerprint: true
//             }
//         }

//         stage('Release') {
//             when {
//                 branch 'main'
//             }
//             steps {
//                 script {
//                     configureGit()
//                     createGitHubRelease()
//                 }
//             }
//         }
//     }

//     post {
//         always {
//             cleanWs()
//         }
//         success {
//             echo 'Pipeline completed successfully!'
//         }
//         failure {
//             echo 'Pipeline failed!'
//         }
//     }
// }

// def getApplicationVersion() {
//     def packageJson = readJSON file: 'package.json'
//     def version = packageJson.version

//     def branch = env.GIT_BRANCH ?: sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()

//     if (branch in ['main', 'origin/main']) {
//         def commitSha = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
//         version = version.replaceAll(/-SNAPSHOT$/, '') + "-${commitSha}"
//     }

//     return version
// }

// def configureGit() {
//     sh '''
//         git config user.name "jenkins"
//         git config user.email "jenkins@ci.local"
//     '''
// }

// def createGitHubRelease() {
//     withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
//         def commitSha = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
//         def releaseNotes = "front-a-deux-pas release v${env.APP_VERSION}\\n\\nCommit: ${commitSha}"

//         sh """
//             gh release create v${env.APP_VERSION} ${APP_NAME}-${env.APP_VERSION}.zip \
//                 --title "v${env.APP_VERSION}" \
//                 --notes "${releaseNotes}" \
//                 --target main
//         """
//     }
// }
