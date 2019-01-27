using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class OvenKnobScript : MonoBehaviour
{
    public GameObject OvenKnob;
    public Text OvenTemperatureDisplay;
    private string DegreeSymbol = "°";
    public Vector3 temp;
    public int OvenTemperature = 0;
    public float OT;
    private Text tempText;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        OT = OvenKnob.transform.rotation.x;
         temp = new Vector3(OvenKnob.transform.eulerAngles.x, 0, 0);
        OvenTemperature = (int)temp.x;
        OvenTemperatureDisplay.text = OvenTemperature.ToString();
        //+ DegreeSymbol;
    }
}
