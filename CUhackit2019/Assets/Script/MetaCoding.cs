using UnityEngine;
using System.Collections;
using System.Net;
using System.IO;
using SimpleJSON;

public class MetaCoding : MonoBehaviour
{

    int counter = 1;

    public GameObject meat;
    public GameObject topBun;
    public GameObject bottomBun;
    public GameObject americanCheese;
    //public GameObject lettuce;
    
    //public GameObject egg;

    public GameObject pizzaCrust;
    public GameObject pizzaCheese;
    //public GameObject pizzaPepperoni;
    


    IEnumerator DownloadWebService()
    {
        while (true)
        {
            WWW w = new WWW("http://cookingvr.herokuapp.com/?command");
            yield return w;

            print("Waiting for webservice\n");

            yield return new WaitForSeconds(1f);

            print("Received webservice\n");

            ExtractCommand(w.text);

            print("Extracted information");

            WWW y = new WWW("http://cookingvr.herokuapp.com/?command=empty");
            yield return y;

            print("Cleaned webservice");

            yield return new WaitForSeconds(5);
        }
    }

    void ExtractCommand(string json)
    {
        var jsonstring = JSON.Parse(json);
        string command = jsonstring["command"];
        print(command);
        if (command == null) { return; }
        string[] commands_array = command.Split(" "[0]);
        if (commands_array.Length < 2)
        {
            return;
        }
        if (commands_array[0] == "create")
        {
            CreateObject(commands_array[1]);
        }
    }

    void CreateObject(string shape)
    {

        string name = "NewObject_" + counter;
        counter += 1;
        GameObject NewObject = new GameObject(name);

        switch (shape)
        {
            case "hamburger":
                //NewObject = GameObject.CreatePrimitive(PrimitiveType.Cube);
                NewObject = GameObject.Instantiate(meat, new Vector3(2, 1.47f, -2.42f), Quaternion.identity);
                NewObject.transform.position = new Vector3(2, 1.47f, -2.42f);
                NewObject = GameObject.Instantiate(topBun, new Vector3(2, 1.47f, -2.42f), Quaternion.identity);
                NewObject = GameObject.Instantiate(bottomBun, new Vector3(2, 1.47f, -2.42f), Quaternion.identity);
                NewObject = GameObject.Instantiate(americanCheese, new Vector3(2, 1.47f, -2.42f), Quaternion.identity);

                break;
            case "pizza":
                NewObject = GameObject.Instantiate(pizzaCrust, new Vector3(3.89f, 1.73f, -2.55f), Quaternion.identity);
                NewObject.transform.position = new Vector3(3.89f, 1.73f, -2.55f);
                NewObject = GameObject.Instantiate(pizzaCheese, new Vector3(3.89f, 1.73f, -2.55f), Quaternion.identity);
                NewObject.transform.position = new Vector3(3.89f, 1.73f, -2.55f);
                //  NewObject = GameObject.Instantiate(, new Vector3(0.0f, 0.0f, 0.0f), Quaternion.identity);
                break;
            case "cylinder":
                NewObject = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
                break;
            case "capsule":
                NewObject = GameObject.CreatePrimitive(PrimitiveType.Capsule);
                break;
        }
        NewObject.transform.position = new Vector3(0, 5, 0);
        NewObject.AddComponent<Rigidbody>();
    }

    // Use this for initialization
    void Start()
    {
        print("Started webservice import...\n");

        StartCoroutine(DownloadWebService());
    }

    // Update is called once per frame
    void Update()
    {

    }
}