<h1>Secret Santa REST API application(Express, SQLite, Node.js)</h1>
<h2>Getting started</h2>
<ol>
    <li>
        Install NPM packages
        <pre>npm i</pre>
    </li>
    <li>
        Start app
        <pre>npm start</pre>
    </li>
    <li>
        To send requests and get responses you need POSTMAN app
    </li>
   <li>
        Routes in app:
        <pre>POST "/": to register a new player in the game<br>POST "/shuffle": to determine pairs of sender-recipient in the game<br>GET "/recipient/:id": to find out about your recipient by your id number</pre>
   </li>
   <li>
        Params:<br>
        1) To register new user pass JSON object in body containing such field: name(string), surname(string), wishlish(array containing string elements)<br>
        2) To get recipient type user id in url "/recipient/{id}"  
   </li>
</ol>

