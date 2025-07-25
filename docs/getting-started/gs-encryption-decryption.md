---
title: Encryption and Decryption
description: Information about encrypting EUID requests and decrypting responses.
hide_table_of_contents: false
sidebar_position: 11
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import IdentityGenerateResponse from '../snippets/_example-identity-generate-response.mdx';

# Encrypting Requests and Decrypting Responses

:::note
If you're a publisher and are implementing EUID on the client side, encryption and decryption is managed automatically by your implementation, such as Prebid.js (see [EUID Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md)) or the JavaScript SDK (see [Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md)).
:::

For almost all EUID [endpoints](../endpoints/summary-endpoints.md), requests sent to the endpoint must be [encrypted](#encrypting-requests) and responses from the endpoint must be [decrypted](#decrypting-responses).

The only exception is that requests to the [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoint do not need to be encrypted.

Here's what you need to know about encrypting EUID API requests and decrypting respective responses:

- To use the APIs, in addition to your client API key, you need your client secret.
- You can write your own custom code or use one of the code examples provided: see [Encryption and Decryption Code Examples](#encryption-and-decryption-code-examples).
- Request and response use AES/GCM/NoPadding encryption algorithm with 96-bit initialization vector and 128-bit authentication tag.
- The raw, unencrypted JSON body of the request is wrapped in a binary [unencrypted request data envelope](#unencrypted-request-data-envelope) which then gets encrypted and formatted according to the [encrypted request envelope](#encrypted-request-envelope).
- The response JSON body is wrapped in a binary [unencrypted response data envelope](#unencrypted-response-data-envelope) which is encrypted and formatted according to the [encrypted response envelope](#encrypted-response-envelope).

## Workflow

The high-level request-response workflow for the EUID APIs includes the following steps:

1. Prepare the request body with input parameters in the JSON format.
2. Wrap the request JSON in an [unencrypted request data envelope](#unencrypted-request-data-envelope).
3. Encrypt the envelope using AES/GCM/NoPadding algorithm and your secret key.
4. Assemble the [Encrypted Request Envelope](#encrypted-request-envelope).
5. Send the encrypted request and receive the encrypted response.
6. Parse the [Encrypted Response Envelope](#encrypted-response-envelope).
7. Decrypt the data in the response envelope.
8. Parse the resulting [Unencrypted Response Data Envelope](#unencrypted-response-data-envelope).
9. (Optional, recommended) Ensure that the nonce in the response envelope matches the nonce in the request envelope.
10. Extract the response JSON object from the unencrypted envelope.

A code example for [encrypting requests and decrypting responses](#encryption-and-decryption-code-examples) can help with automating steps 2-10 and serves as a reference of how to implement these steps in your application.

Documentation for the individual EUID [endpoints](../endpoints/summary-endpoints.md) explains the respective JSON body format requirements and parameters, includes call examples, and shows decrypted responses. The following sections provide encryption and decryption code examples, field layout requirements, and request and response examples.

## Encrypting Requests

You have the option of writing your own code for encrypting requests, using an EUID SDK, or using one of the provided code examples (see [Encryption and Decryption Code Examples](#encryption-and-decryption-code-examples)). If you choose to write your own code, be sure to follow the field layout requirements listed in [Unencrypted Request Data Envelope](#unencrypted-request-data-envelope) and [Encrypted Request Envelope](#encrypted-request-envelope).

### Unencrypted Request Data Envelope

The following table describes the field layout for request encryption code.

| Offset (Bytes) | Size (Bytes) | Description |
| :--- | :--- | :--- |
| 0 | 8 | The <a href="../ref-info/glossary-uid#gl-unix-time">Unix</a> timestamp (in milliseconds) of the request, in int64 big endian format.<br/>When the server receives and decrypts the envelope, it checks the embedded timestamp. If the timestamp is older than 60 seconds, the request is considered stale and is rejected. |
| 8 | 8 | Nonce: Random 64 bits of data used to help protect against replay attacks. The corresponding [Unencrypted Response Data Envelope](#unencrypted-response-data-envelope) should contain the same nonce value for the response to be considered valid. |
| 16 | N | Payload, which is a request JSON document serialized in UTF-8 encoding. |

### Encrypted Request Envelope

The following table describes the field layout for request encryption code.

| Offset (Bytes) | Size (Bytes) | Description |
| :--- | :--- | :--- |
| 0 | 1 | The version of the envelope format. Must be `1`. |
| 1 | 12 | 96-bit initialization vector (IV), which is used to randomize data encryption. |
| 13 | N | Payload ([unencrypted request data envelope](#unencrypted-request-data-envelope)) encrypted using the AES/GCM/NoPadding algorithm. |
| 13 + N | 16 | 128-bit GCM authentication tag used to verify data integrity. |

## Decrypting Responses

You have the option of writing your own code for decrypting responses, using an EUID SDK, or using one of the provided code examples (see [Encryption and Decryption Code Examples](#encryption-and-decryption-code-examples)). If you choose to write your own code, be sure to follow the field layout requirements listed in [Encrypted Response Envelope](#encrypted-response-envelope) and [Unencrypted Response Data Envelope](#unencrypted-response-data-envelope).

:::note
The response is encrypted only if the service returns HTTP status code 200.
:::

### Encrypted Response Envelope

The following table describes the field layout for response decryption code.

| Offset (Bytes) | Size (Bytes) | Description |
| :--- | :--- | :--- |
| 0 | 12 | 96-bit initialization vector (IV), which is used to randomize data encryption. |
| 12 | N | Payload ([Unencrypted Response Data Envelope](#unencrypted-response-data-envelope)) encrypted using the AES/GCM/NoPadding algorithm. |
| 12 + N | 16 | 128-bit GCM authentication tag used to verify data integrity. |

### Unencrypted Response Data Envelope

The following table describes the field layout for response decryption code.

| Offset (Bytes) | Size (Bytes) | Description |
| :--- | :--- | :--- |
| 0 | 8 | The Unix timestamp (in milliseconds) of the response, in int64 big endian format. |
| 8 | 8 | Nonce. For the response to be considered valid, this should match the nonce in the [unencrypted request data envelope](#unencrypted-request-data-envelope). |
| 16 | N | Payload, which is a response JSON document serialized in UTF-8 encoding. |

### Response Example

For example, a decrypted response to the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) request for an email address might look like this:

<IdentityGenerateResponse />

## Encryption and Decryption Code Examples

This section includes encryption and decryption code examples in different programming languages.

For the [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoint, the code takes the values for `refresh_token` and `refresh_response_key` that were obtained from a prior call to [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) or [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md).

:::note
For Windows, if you're using Windows Command Prompt instead of PowerShell, you must also remove the single quotes surrounding the JSON. For example, use `echo {"email": "test@example.com", "optout_check": 1}`.
:::

### Prerequisites and Notes

Before using the code example, check the prerequisites and notes for the language you're using.

<Tabs groupId="language-selection">
<TabItem value='py' label='Python'>

The following code example encrypts requests and decrypts responses using Python. The required parameters are shown at the top of the code example, or by running `python3 uid2_request.py`.

:::note
For Windows, replace `python3` with `python`.
:::

The Python code requires the `pycryptodomex` and `requests` packages. You can install these as follows:

```console
pip install pycryptodomex
pip install requests
```

</TabItem>
<TabItem value='java' label='Java'>

The following code example encrypts requests and decrypts responses using Java. The required parameters are shown at the top of the main function, or by building and running the following:

```
java -jar Uid2Request-jar-with-dependencies.jar
```

The Java example is written for JDK version 11 or later, and you must have the com.google.code.gson library in your classpath.

If you are using Maven, you can use the following minimal `pom.xml`, and run `mvn package` to build the project:

```xml
<project>
  <modelVersion>4.0.0</modelVersion>
  <groupId>org.example</groupId>
  <artifactId>Uid2Request</artifactId>
  <version>1.0</version>
  
  <properties>
    <maven.compiler.source>11</maven.compiler.source>
    <maven.compiler.target>11</maven.compiler.target>
  </properties>

  <dependencies>
    <dependency>
      <groupId>com.google.code.gson</groupId>
      <artifactId>gson</artifactId>
      <version>2.10</version>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <artifactId>maven-assembly-plugin</artifactId>
        <version>3.4.2</version>
        <executions>
          <execution>
            <phase>package</phase>
            <goals>
              <goal>single</goal>
            </goals>
          </execution>
        </executions>
        <configuration>
          <descriptorRefs>
            <descriptorRef>jar-with-dependencies</descriptorRef>
          </descriptorRefs>
          <archive>
              <manifest>
                <mainClass>org.example.Uid2Request</mainClass>
              </manifest>
          </archive>
        </configuration>
      </plugin>
    </plugins>
    <finalName>${artifactId}</finalName>
  </build>
</project>
```

</TabItem>
<TabItem value='cs' label='C#'>

The following code example encrypts requests and decrypts responses using C#. The required parameters are shown at the top of the file, or by building and running `.\uid2_request`.

This file requires .NET 7.0. You can use an earlier version if required, but it must be .NET Core 3.0 or later. To change the version, replace the [top-level statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements) with a Main method and the [using declarations](https://learn.microsoft.com/en-us/cpp/cpp/using-declaration?view=msvc-170) with [using statements](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/proposals/csharp-8.0/using).

</TabItem>
<TabItem value='go' label='Go'>

The following code example encrypts requests and decrypts responses using Go. The required parameters are shown at the bottom of the file, or by running `go run uid2_request.go`.

</TabItem>
</Tabs>

### Code Example

Choose the code example you want to use. Remember to review the [Prerequisites and Notes](#prerequisites-and-notes).

<Tabs groupId="language-selection">
<TabItem value='py' label='Python'>

```py title="uid2_request.py"
"""
Usage:
   echo '<json>' | python3 uid2_request.py <url> <api_key> <client_secret>

Example:
   echo '{"email": "test@example.com", "optout_check": 1}' | python3 uid2_request.py https://prod.euid.eu/v2/token/generate PRODGwJ0hP19QU4hmpB64Y3fV2dAed8t/mupw3sjN5jNRFzg= wJ0hP19QU4hmpB64Y3fV2dAed8t/mupw3sjN5jNRFzg=
   

Refresh Token Usage:
   python3 uid2_request.py <url> --refresh-token <refresh_token> <refresh_response_key>

Refresh Token Usage example:
   python3 uid2_request.py https://prod.euid.eu/v2/token/refresh --refresh-token AAAAAxxJ...(truncated, total 388 chars) v2ixfQv8eaYNBpDsk5ktJ1yT4445eT47iKC66YJfb1s=

"""

import base64
import os
import sys	
import time
import json

import requests
from Cryptodome.Cipher import AES

def b64decode(b64string, param):
   try:
      return base64.b64decode(b64string)
   except Exception:
   	   print(f"Error: <{param}> is not base64 encoded")
   	   sys.exit()
	   
if len(sys.argv) != 4 and len(sys.argv) != 5:
   print(__doc__)
   sys.exit()

url = sys.argv[1]

is_refresh = 1 if sys.argv[2] == '--refresh-token' else 0
if is_refresh:
   refresh_token = sys.argv[3]
   secret = b64decode(sys.argv[4], "refresh_response_key")
   print(f"\nRequest: Sending refresh_token to {url}\n")
   http_response = requests.post(url, refresh_token)
else:
   api_key = sys.argv[2]
   secret = b64decode(sys.argv[3], "client_secret")
   payload = "".join(sys.stdin.readlines())

   iv = os.urandom(12)
   cipher = AES.new(secret, AES.MODE_GCM, nonce=iv)

   millisec = int(time.time() * 1000)
   request_nonce = os.urandom(8)

   print(f"\nRequest: Encrypting and sending to {url} : {payload}")

   body = bytearray(millisec.to_bytes(8, 'big'))
   body += bytearray(request_nonce)
   body += bytearray(bytes(payload, 'utf-8'))

   ciphertext, tag = cipher.encrypt_and_digest(body)

   envelope = bytearray(b'\x01')
   envelope += bytearray(iv)
   envelope += bytearray(ciphertext)
   envelope += bytearray(tag)

   base64Envelope = base64.b64encode(bytes(envelope)).decode()

   http_response = requests.post(url, base64Envelope, headers={"Authorization": "Bearer " + api_key})
   
# Decryption 
response = http_response.content
if http_response.status_code != 200:
   print(f"Response: Error HTTP status code {http_response.status_code}", end=", check api_key\n" if http_response.status_code == 401 else "\n")
   print(response.decode("utf-8"))
else:
   resp_bytes = base64.b64decode(response)
   iv = resp_bytes[:12]
   data = resp_bytes[12:len(resp_bytes) - 16]
   tag = resp_bytes[len(resp_bytes) - 16:]

   cipher = AES.new(secret, AES.MODE_GCM, nonce=iv)
   decrypted = cipher.decrypt_and_verify(data, tag)

   if is_refresh != 1:
      json_resp = json.loads(decrypted[16:].decode("utf-8"))
   else:
      json_resp = json.loads(decrypted.decode("utf-8"))
      
   print("Response JSON:")
   print(json.dumps(json_resp, indent=4))

```

</TabItem>
<TabItem value='java' label='Java'>

```java title="Uid2Request.java"
package org.example;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.Arrays;
import java.util.Base64;
import javax.crypto.Cipher;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class Uid2Request {
  public static final int NONCE_LENGTH_BYTES = 8;
  private static final int GCM_TAG_LENGTH_BYTES = 16;
  private static final int GCM_IV_LENGTH_BYTES = 12;

  public static void main(String[] args) throws Exception {
    if (args.length != 3 && args.length != 4) {
      System.out.println(
              "Usage:" + "\n   "
      +             "java -jar Uid2Request-jar-with-dependencies.jar <url> <api_key> <client_secret>" + "\n\n"
      
      +       "Example:" + "\n   "  
      +             "echo '{\"email\": \"test@example.com\",\"optout_check\": 1}' | java -jar Uid2Request-jar-with-dependencies.jar https://prod.euid.eu/v2/token/generate PRODGwJ0hP19QU4hmpB64Y3fV2dAed8t/mupw3sjN5jNRFzg= wJ0hP19QU4hmpB64Y3fV2dAed8t/mupw3sjN5jNRFzg=" + "\n\n\n"
      
      +       "Refresh Token Usage:" + "\n   "
      +             "java -jar Uid2Request-jar-with-dependencies.jar <url> --refresh-token <refresh_token> <refresh_response_key>"  + "\n\n"
                      
      +       "Refresh Token Example:" + "\n   " 
      +             "java -jar Uid2Request-jar-with-dependencies.jar https://prod.euid.eu/v2/token/refresh --refresh-token AAAAAxxJ...(truncated, total 388 chars) v2ixfQv8eaYNBpDsk5ktJ1yT4445eT47iKC66YJfb1s="  + "\n"
      );
      System.exit(1);
    }

    String url = args[0];
    boolean isRefresh = "--refresh-token".equals(args[1]);
    byte[] secret = Base64.getDecoder().decode(args[isRefresh ? 3 : 2]);

    String payload = isRefresh ? args[2] : new BufferedReader(new InputStreamReader(System.in)).readLine();

    HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
    connection.setRequestMethod("POST");

    if (!isRefresh) {
      String apiKey = args[1];

      byte[] iv = new byte[GCM_IV_LENGTH_BYTES];
      long timestamp = Instant.now().toEpochMilli();
      byte[] requestNonce = new byte[NONCE_LENGTH_BYTES];
      byte[] plaintext = payload.getBytes(StandardCharsets.UTF_8);

      SecureRandom secureRandom = new SecureRandom();
      secureRandom.nextBytes(iv);
      secureRandom.nextBytes(requestNonce);

      ByteBuffer body = ByteBuffer.allocate(8 + requestNonce.length + plaintext.length);
      body.putLong(timestamp);
      body.put(requestNonce);
      body.put(plaintext);

      Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
      GCMParameterSpec parameterSpec = new GCMParameterSpec(GCM_TAG_LENGTH_BYTES * 8, iv);
      cipher.init(Cipher.ENCRYPT_MODE, new SecretKeySpec(secret, "AES"), parameterSpec);

      ByteBuffer envelope = ByteBuffer.allocate(1 + body.array().length + GCM_IV_LENGTH_BYTES + GCM_TAG_LENGTH_BYTES);
      envelope.put((byte) 1);
      envelope.put(iv);
      envelope.put(cipher.doFinal(body.array()));

      payload = Base64.getEncoder().encodeToString(envelope.array());
      connection.setRequestProperty("Authorization", "Bearer " + apiKey);
    }

    connection.setDoOutput(true);
    try (OutputStream os = connection.getOutputStream()) {
      os.write(payload.getBytes(StandardCharsets.UTF_8));
    }

    // Handle response
    int status = connection.getResponseCode();
    BufferedReader reader = status == 200 ?
        new BufferedReader(new InputStreamReader(connection.getInputStream())) :
        new BufferedReader(new InputStreamReader(connection.getErrorStream()));
    StringBuilder response = new StringBuilder();
    String line;
    while ((line = reader.readLine()) != null) {
      response.append(line);
    }
    reader.close();

    if (status != HttpURLConnection.HTTP_OK) {
      System.out.println("Error: HTTP status code " + status);
      System.out.println(response);
      return;
    }

    byte[] respBytes = Base64.getDecoder().decode(response.toString());

    Cipher respCipher = Cipher.getInstance("AES/GCM/NoPadding");
    respCipher.init(Cipher.DECRYPT_MODE, new SecretKeySpec(secret, "AES"), new GCMParameterSpec(GCM_TAG_LENGTH_BYTES * 8, respBytes, 0, GCM_IV_LENGTH_BYTES));
    byte[] decrypted = respCipher.doFinal(respBytes, GCM_IV_LENGTH_BYTES, respBytes.length - GCM_IV_LENGTH_BYTES);

    JsonObject jsonResponse;
    if (!isRefresh) {
      jsonResponse = JsonParser.parseString(new String(Arrays.copyOfRange(decrypted, 8 + NONCE_LENGTH_BYTES, decrypted.length), StandardCharsets.UTF_8)).getAsJsonObject();
    } else {
      jsonResponse = JsonParser.parseString(new String(decrypted, StandardCharsets.UTF_8)).getAsJsonObject();
    }
    String prettyJsonResponse = new GsonBuilder().disableHtmlEscaping().setPrettyPrinting().create().toJson(jsonResponse);
    System.out.println("Response JSON:");
    System.out.println(prettyJsonResponse);
  }
}
```

</TabItem>
<TabItem value='cs' label='C#'>

```cs title="uid2_request.cs"
using System.Buffers.Binary;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;


if (args.Length != 3 && args.Length != 4)
{
    Console.WriteLine("""
Usage:
   echo '<json>' | .\uid2_request <url> <api_key> <client_secret>

Example:
   echo '{"email": "test@example.com", "optout_check": 1}' | .\uid2_request https://prod.euid.eu/v2/token/generate UID2-C-L-999-fCXrMM.fsR3mDqAXELtWWMS+xG1s7RdgRTMqdOH2qaAo= wJ0hP19QU4hmpB64Y3fV2dAed8t/mupw3sjN5jNRFzg=
   

Refresh Token Usage:
   .\uid2_request <url> --refresh-token <refresh_token> <refresh_response_key>

Refresh Token Usage example:
   .\uid2_request https://prod.euid.eu/v2/token/refresh --refresh-token AAAAAxxJ...(truncated, total 388 chars) v2ixfQv8eaYNBpDsk5ktJ1yT4445eT47iKC66YJfb1s=
""");

    Environment.Exit(1);
}

const int GCM_IV_LENGTH = 12;

string url = args[0];
byte[] secret;

HttpResponseMessage? response;
bool isRefresh = args[1] == "--refresh-token";

if (isRefresh)
{
    string refreshToken = args[2];
    secret = Convert.FromBase64String(args[3]);

    Console.WriteLine($"\nRequest: Sending refresh_token to {url}\n");
    using HttpClient httpClient = new HttpClient();
    var content = new StringContent(refreshToken, Encoding.UTF8);
    response = await httpClient.PostAsync(url, content);
}
else
{
    string apiKey = args[1];
    secret = Convert.FromBase64String(args[2]);

    string payload = Console.In.ReadToEnd();

    var request = new HttpRequestMessage(HttpMethod.Post, url);
    request.Headers.Add("Authorization", $"Bearer {apiKey}");

    var unixTimestamp = new byte[8];
    BinaryPrimitives.WriteInt64BigEndian(unixTimestamp, DateTimeOffset.UtcNow.ToUnixTimeMilliseconds());

    var nonce = new byte[8];
    var rnd = new Random();
    rnd.NextBytes(nonce);

    var payloadBytes = Encoding.UTF8.GetBytes(payload);

    var unencryptedRequestDataEnvelope = new byte[unixTimestamp.Length + nonce.Length + payloadBytes.Length];
    unixTimestamp.CopyTo(unencryptedRequestDataEnvelope, 0);
    nonce.CopyTo(unencryptedRequestDataEnvelope, unixTimestamp.Length);
    payloadBytes.CopyTo(unencryptedRequestDataEnvelope, unixTimestamp.Length + nonce.Length);

    var iv = new byte[GCM_IV_LENGTH];
    rnd.NextBytes(iv);

    var encryptedPayload = new byte[unencryptedRequestDataEnvelope.Length];
    var tag = new byte[AesGcm.TagByteSizes.MaxSize];
    using AesGcm aesGcm = new AesGcm(secret);
    aesGcm.Encrypt(iv, unencryptedRequestDataEnvelope, encryptedPayload, tag);

    var envelopeMemoryStream = new MemoryStream(1 + iv.Length + encryptedPayload.Length + AesGcm.TagByteSizes.MaxSize);
    envelopeMemoryStream.WriteByte(1); //version of the envelope format
    envelopeMemoryStream.Write(iv);
    envelopeMemoryStream.Write(encryptedPayload);
    envelopeMemoryStream.Write(tag);
    var envelope = Convert.ToBase64String(envelopeMemoryStream.ToArray());

    request.Content = new StringContent(envelope, Encoding.UTF8);

    var client = new HttpClient();
    response = await client.SendAsync(request);
}

var responseStream = await response.Content.ReadAsStreamAsync();
using var reader = new StreamReader(responseStream);

var responseBody = await reader.ReadToEndAsync();

if (response.StatusCode != HttpStatusCode.OK)
{
    Console.WriteLine($"Response: Error HTTP status code {(int)response.StatusCode}" + ((response.StatusCode == HttpStatusCode.Unauthorized) ? ", check api_key" : ""));
    Console.WriteLine(responseBody);
}
else
{
    var encryptedResponseEnvelope = Convert.FromBase64String(responseBody);

    var responseMemoryStream = new MemoryStream(encryptedResponseEnvelope);
    byte[] iv = new byte[GCM_IV_LENGTH];
    responseMemoryStream.Read(iv);

    int encryptedPayloadLength = encryptedResponseEnvelope.Length - GCM_IV_LENGTH - AesGcm.TagByteSizes.MaxSize;
    byte[] encryptedPayload = new byte[encryptedPayloadLength];
    responseMemoryStream.Read(encryptedPayload);

    byte[] tag = new byte[AesGcm.TagByteSizes.MaxSize];
    responseMemoryStream.Read(tag);

    using AesGcm aesGcm = new AesGcm(secret);
    byte[] unencryptedResponseDataEnvelope = new byte[encryptedPayload.Length];
    aesGcm.Decrypt(iv, encryptedPayload, tag, unencryptedResponseDataEnvelope);

    int offset = isRefresh ? 0 : 16; //8 bytes for timestamp + 8 bytes for nonce
    var json = Encoding.UTF8.GetString(unencryptedResponseDataEnvelope, offset, unencryptedResponseDataEnvelope.Length - offset);

    Console.WriteLine("Response JSON:");
    
    using var jDoc = JsonDocument.Parse(json);
    Console.WriteLine(JsonSerializer.Serialize(jDoc, new JsonSerializerOptions { WriteIndented = true }));
}
```

</TabItem>
<TabItem value='go' label='Go'>

```go title="uid2_request.go"
package main

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/base64"
	"encoding/binary"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"time"
)

const (
	nonceLengthBytes = 8
	gcmIVLengthBytes = 12
)

func main() {
	subArgs := os.Args[1:]

	if len(subArgs) != 3 && len(subArgs) != 4 {
		printUsage()
		os.Exit(1)
	}

	url := subArgs[0]

	response, err := func() (map[string]interface{}, error) {
		if subArgs[1] == "--refresh-token" {
			return refresh(url, subArgs[2], subArgs[3])
		} else {
			return generate(url, subArgs[1], subArgs[2])
		}
	}()

	if err != nil {
		log.Fatal(err)
	}

	prettyPrint(response)
}

func refresh(url string, refreshToken string, refreshResponseKey string) (map[string]interface{}, error) {
	fmt.Printf("Request: Sending refresh_token to %s\n", url)

	response, err := http.Post(url, "", strings.NewReader(refreshToken))
	if err != nil {
		return nil, err
	}

	return deserializeResponse(response, refreshResponseKey, true)
}

func generate(url string, apiKey string, secret string) (map[string]interface{}, error) {
	payload, err := io.ReadAll(os.Stdin)
	if err != nil {
		return nil, err
	}

	key, err := base64.StdEncoding.DecodeString(secret)
	if err != nil {
		return nil, err
	}

	unencryptedEnvelope, err := makeUnencryptedEnvelope(payload)
	if err != nil {
		return nil, err
	}

	envelope, err := makeEncryptedEnvelope(unencryptedEnvelope, key)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest("POST", url, strings.NewReader(base64.StdEncoding.EncodeToString(envelope)))
	if err != nil {
		return nil, err
	}

	req.Header.Add("Authorization", "Bearer "+apiKey)

	response, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}

	return deserializeResponse(response, secret, false)
}

func aesgcm(key []byte) (cipher.AEAD, error) {
	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}

	return cipher.NewGCM(block)
}

func decryptResponse(ciphertext string, key string) ([]byte, error) {
	ciphertextBytes, err := base64.StdEncoding.DecodeString(ciphertext)
	if err != nil {
		return nil, err
	}

	keyBytes, err := base64.StdEncoding.DecodeString(key)
	if err != nil {
		return nil, err
	}

	aesgcm, err := aesgcm(keyBytes)
	if err != nil {
		return nil, err
	}

	iv := ciphertextBytes[:gcmIVLengthBytes]
	return aesgcm.Open(nil, iv, ciphertextBytes[gcmIVLengthBytes:], nil)
}

func deserialize(bytes []byte) (map[string]interface{}, error) {
	var anyJson map[string]interface{}
	err := json.Unmarshal(bytes, &anyJson)
	return anyJson, err
}

func prettyPrint(obj map[string]interface{}) error {
	bytes, err := json.MarshalIndent(obj, "", "  ")
	if err != nil {
		return err
	}

	fmt.Println(string(bytes))
	return nil
}

func checkStatusCode(response *http.Response, body []byte) error {
	if response.StatusCode != http.StatusOK {
		return fmt.Errorf("Response: Error HTTP status code %d\n%s", response.StatusCode, body)
	}

	return nil
}

func makeUnencryptedEnvelope(payload []byte) ([]byte, error) {
	timestamp := make([]byte, 8)
	binary.BigEndian.PutUint64(timestamp, uint64(time.Now().UnixMilli()))

	nonce := make([]byte, nonceLengthBytes)
	_, err := rand.Read(nonce)
	if err != nil {
		return nil, err
	}

	var body bytes.Buffer
	body.Write(timestamp)
	body.Write(nonce)
	body.Write(payload)
	return body.Bytes(), nil
}

func encrypt(plaintext []byte, iv []byte, key []byte) ([]byte, error) {
	aesgcm, err := aesgcm(key)
	if err != nil {
		return nil, err
	}

	return aesgcm.Seal(nil, iv, plaintext, nil), nil
}

func makeEncryptedEnvelope(payload []byte, key []byte) ([]byte, error) {
	iv := make([]byte, gcmIVLengthBytes)
	_, err := rand.Read(iv)
	if err != nil {
		return nil, err
	}

	ciphertext, err := encrypt(payload, iv, key)
	if err != nil {
		return nil, err
	}

	var envelope bytes.Buffer
	envelope.WriteByte(1)
	envelope.Write(iv)
	envelope.Write(ciphertext)
	return envelope.Bytes(), nil
}

func deserializeResponse(response *http.Response, key string, isRefresh bool) (map[string]interface{}, error) {
	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		return nil, err
	}

	err = checkStatusCode(response, body)
	if err != nil {
		return nil, err
	}

	plaintext, err := decryptResponse(string(body), key)
	if err != nil {
		return nil, err
	}

	offset := 16
	if isRefresh {
		offset = 0
	}

	return deserialize(plaintext[offset:])
}

func printUsage() {
	fmt.Println(`Usage:
   echo '<json>' | go run uid2_request.go <url> <api_key> <client_secret>

Example:
   echo '{"email": "test@example.com", "optout_check": 1}' | go run uid2_request.go https://prod.euid.eu/v2/token/generate UID2-C-L-999-fCXrMM.fsR3mDqAXELtWWMS+xG1s7RdgRTMqdOH2qaAo= wJ0hP19QU4hmpB64Y3fV2dAed8t/mupw3sjN5jNRFzg=
   

Refresh Token Usage:
   go run uid2_request.go <url> --refresh-token <refresh_token> <refresh_response_key>

Refresh Token Usage example:
   go run uid2_request.go https://prod.euid.eu/v2/token/refresh --refresh-token AAAAAxxJ...(truncated, total 388 chars) v2ixfQv8eaYNBpDsk5ktJ1yT4445eT47iKC66YJfb1s=`)
}

```
</TabItem>

</Tabs>
