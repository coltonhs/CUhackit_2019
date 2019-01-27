using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class StoveTopChangeColorScript : MonoBehaviour
{
    private Texture newTexture;
    private Vector2 newOffset;
    private Vector2 newTiling;

    public float BlendSpeed = 3.0f;

    public bool trigger = false;
    private float fader = 0f;
    public Text ovenTemperature;
    private Renderer rend;
    void Start()
    {
        rend = GetComponent<Renderer>();
        rend.material.SetFloat("_Blend", 0f);
    }

    void Update()
    {
        if (true == trigger)
        {
            //fader += Time.deltaTime * BlendSpeed;
            //fader = int.parseInt(ovenTemperature.text);
            fader = int.Parse(ovenTemperature.text);
            rend.material.SetFloat("_Blend", fader);
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
}
    