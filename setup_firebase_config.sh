#!/bin/bash

echo "🔥 Setting up Firebase Functions environment variables..."

# Set Firebase config values
firebase functions:config:set app.node_env="production"
firebase functions:config:set app.port="3001"
firebase functions:config:set app.api_version="v1"

firebase functions:config:set fbConfig.project_id="campus-connect-aab7a"
firebase functions:config:set fbConfig.client_email="firebase-adminsdk-fbsvc@campus-connect-aab7a.iam.gserviceaccount.com"
firebase functions:config:set fbConfig.web_api_key="AIzaSyBv_XaAG1iUKN-ZIgXe9R8PR3rrKfZNa7E"
firebase functions:config:set fbConfig.auth_domain="campus-connect-aab7a.firebaseapp.com"
firebase functions:config:set fbConfig.storage_bucket="campus-connect-aab7a.firebasestorage.app"
firebase functions:config:set fbConfig.messaging_sender_id="1067915585714"
firebase functions:config:set fbConfig.app_id="1:1067915585714:web:420031a0f54a46bcd741ab"
firebase functions:config:set fbConfig.measurement_id="G-1YF3THQQVN"

echo "⚠️  Setting Firebase private key..."

# Define the private key as a variable (use escaped newlines)
PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDPFgrCB5LnTsX0\nPJGjt7tpv3HwFkgL0M7ADhAWlVyO6sJkT3mp3/t9LoRQ8HISX2iH959C8dYhyygF\n0RU0xDkNxjWdsWgOKkncBTwrujTH7cIvShI4NTuLO0e4b0uBM7+zwo+HZFqYrHT/\nXQTVNWNr1dUqv5iThQpDivmnDXy4DDD5VbDiKlfi5bzSChv8fHu6NUqA2IEMWg6E\ngSY8GOV2Xz0/3hZt9BlbSKnEeC2Ny9+BTmD9FTpIxaVc8/1cG96GgaVFBEmcXMGi\nvY2zfMW8TaFBRXQwsX4TdFscR5x56JKdcz8KQUH955Cm54XqC/qBsz3jhMAjHfuZ\nGijT5npjAgMBAAECggEAGPDsLHCcv6bBTl2pzXXi/g+p3th9e+LTC9bbFtqNXRnR\nfiMDobM8HFhpD5XYqfV7Zv4qscrjrIqbJZGILs8/7zSYn4dO438yCcGdp3HpSne3\nGVqf9XdqgPs2SPR/5liVCvGbYhtIPWFumT+a8JIvXmemIVxrDsAJZkIg4v72WZ9y\nh7x9vJ6islzDlv2C+FDyWaifGrqN3vftWhwWPd8lLQYXkAAJsmgSF1KPK9dquwWk\nx0j8yr8Momp9r8Uo85D+1SDZT3VcPyEW3wyugkXvWXi28cvMbi4Jgas0L8zNoRnY\nxie3dhsV7EZbud0eWYOksyZW0mkhZqOXODQhXyGXPQKBgQD+XV0BkSEzFAgI3urG\nvzpgt93h6eg0eXu/9cbfCOnhDkZhvHoLEEOpRxfQi9iW14DBjLkvZOYdjb/qCDDu\nUqtX0MMwJP3+CjLGLLXFrcoA4OYPj84/ay7fxKbhVKKkdj0Q1rF9ZpJ3mdDlSnT5\ngflnfnVdesiE28F3UE0y64uDBwKBgQDQat3zM2xK2MaO3A3CywrUI62eOP2yN+Zp\nAAjj16k8BiEsfCTmy0WkGuTpd84/MBmepv6AZjydGhn2F2ir1/mxzduGZYXx/xXK\n6jyNtB1YerrsyWS2QCma5Up3gQbrSvgy+CGU6Lh1yzCRM7dskE+8dqdYOEKXg+SG\nMZxD5TiqxQKBgQCPxs4veI0/he8UtIwYUzb4PHXaoJB0OMbONmp2317zq1H1JMgH\nQOY95MV9R87hVGafAKAcPfgkdF8qNf8SdwAK3yG1MPOwiKsygUsttZIc9QKVgT+f\ncUJJkaqSa3iTZZIW1oP00emwWO1O7cs4zVLgQQauFB0Lm/u7KVS5l5KAOQKBgCsB\nUikDvF25W0dRKtm98c8SSZnzYo3qsPWLl0oETxxem2vFdgvVd9pD3mY6XWl2cGLn\nTG6MKge0whSgge2rlA9XTevuePQVUZbcPIB04PVH5dhEOi7NEIiwtWvxSM82Wf6S\nasOCPcW4lp3vkPKq2Hkn9qHiggMnqPjzta3g14+NAoGAbWHAoIF02K1PUfoFTYzG\nk4a2dWUxu9RHlXB3hT/RP1Am5Jj+hIMfgexlGTNDx6iOWkjYEDlpZOfqwKnr4thU\nL/VQM+KTGfyj3tAlJa422uqFN+9VRUPFZt2Awg8BmfdD50ZZZFPEampTAKObssxz\ntk1C7Jbd8WSVqb0P1Fv8moc=\n-----END PRIVATE KEY-----"

firebase functions:config:set fbConfig.private_key="$PRIVATE_KEY"

echo "✅ All environment variables have been set!"
echo ""
echo "🔍 To verify the configuration, run:"
echo "firebase functions:config:get"
echo ""
echo "🚀 To deploy your functions, run:"
echo "firebase deploy --only functions"
