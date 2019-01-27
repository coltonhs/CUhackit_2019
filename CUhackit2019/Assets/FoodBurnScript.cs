using System.Collections;
using System.Collections.Generic;
using UnityEngine;
public class FoodBurnScript : MonoBehaviour
{
    private Texture newTexture;
    private Vector2 newOffset;
    private Vector2 newTiling;

    public float BlendSpeed = 3.0f;

    public bool trigger = false;
    private float fader = 0f;
    private int temp;

    private OvenKnobScript ovenKnobScript;
    public int desiredTemperature = 350;
    public GameObject knob;
    private Renderer rend;
    private bool canBeCooked = false;
    void Start()
    {
        knob = GameObject.Find("OvenKnob");

        rend = GetComponent<Renderer>();
        rend.material.SetFloat("_Blend", 0f);
    }

    void Update()
    {
        temp = knob.GetComponent<OvenKnobScript>().OvenTemperature;
        if(temp == desiredTemperature)
        {
            if (true == trigger)
            {
                if (fader < 0.69)
                {
                    fader += Time.deltaTime * BlendSpeed;
                }

                rend.material.SetFloat("_Blend", fader);
            }
        }
      
    }

    public void CrossFadeTo(Texture curTexture, Vector2 offset, Vector2 tiling)
    {
        newOffset = offset;
        newTiling = tiling;
        newTexture = curTexture;
        rend.material.SetTexture("_Texture2", curTexture);
        rend.material.SetTextureOffset("_Texture2", newOffset);
        rend.material.SetTextureScale("_Texture2", newTiling);
        trigger = true;
    }

    private void OnTriggerEnter(Collider other)
    {
        trigger = true;
    }

    private void OnTriggerExit(Collider other)
    {
        trigger = false;
    }
}